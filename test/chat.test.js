const { getByTestId, fireEvent } = require('@testing-library/dom');

describe('Chat Interface', () => {
    let appData;

    beforeEach(() => {
        // Mock Alpine.js
        global.Alpine = {
            data: (name, callback) => {
                appData = callback();
                // Attach the data to the element
                document.querySelector('#app').__x = {
                    $data: appData
                };
                return appData;
            }
        };

        document.body.innerHTML = `
            <div id="app" x-data="chatApp">
                <div id="chat-messages" data-testid="chat-messages"></div>
                <form data-testid="chat-form" @submit.prevent="sendMessage">
                    <input 
                        type="text" 
                        data-testid="message-input"
                        x-model="newMessage"
                    />
                    <button type="submit" data-testid="send-button">Send</button>
                </form>
            </div>
        `;

        // Initialize Alpine data
        const chatApp = global.Alpine.data('chatApp', () => ({
            messages: [],
            newMessage: '',
            apiEndpoint: '',
            async sendMessage(event) {
                if (!this.newMessage.trim()) return;
                
                this.messages.push({
                    role: 'user',
                    content: this.newMessage
                });
                
                this.newMessage = '';
            }
        }));

        // Bind the submit handler
        const form = document.querySelector('[data-testid="chat-form"]');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            appData.sendMessage(e);
        });
    });

    test('should have a message input field', () => {
        const input = document.querySelector('[data-testid="message-input"]');
        expect(input).toBeInTheDocument();
    });

    test('should have a send button', () => {
        const button = document.querySelector('[data-testid="send-button"]');
        expect(button).toBeInTheDocument();
    });

    test('should have a messages container', () => {
        const messagesContainer = document.querySelector('[data-testid="chat-messages"]');
        expect(messagesContainer).toBeInTheDocument();
    });

    test('should clear input after form submission', async () => {
        const form = document.querySelector('[data-testid="chat-form"]');
        
        appData.newMessage = 'Test message';
        await fireEvent.submit(form);
        
        expect(appData.newMessage).toBe('');
    });

    test('should add user message to chat history on submit', async () => {
        const form = document.querySelector('[data-testid="chat-form"]');
        
        appData.newMessage = 'Test message';
        await fireEvent.submit(form);
        
        expect(appData.messages.length).toBe(1);
        expect(appData.messages[0].content).toBe('Test message');
    });
}); 