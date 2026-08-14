import React, { useState, useEffect, useRef } from 'react'
import FridayAvatar from './FridayAvatar'
import './app.scss'

const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const VaibhavAI = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            text: "Hi 👋 I'm FRIDAY, Vaibhav's personal AI assistant. Ask me anything about Vaibhav."
        }
    ])

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        if (isOpen) {
            scrollToBottom()
        }
    }, [messages, isLoading, isOpen])

    const sendMessage = async () => {
        const trimmed = input.trim()
        if (!trimmed || isLoading) return

        const userMessage = {
            role: 'user',
            text: trimmed
        }

        // Update local state with the user message immediately
        const updatedMessages = [...messages, userMessage]
        setMessages(updatedMessages)
        setInput('')
        setIsLoading(true)

        try {
            const response = await fetch(`${BACKEND_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: trimmed,
                    messages: updatedMessages
                })
            })

            const data = await response.json().catch(() => null)

            if (!response.ok) {
                let errorMessage = "Sorry, I'm having trouble connecting to my AI service right now."

                if (data && (data.reply || data.message)) {
                    errorMessage = data.reply || data.message
                } else {
                    switch (response.status) {
                        case 400:
                            errorMessage = "Invalid request. Please check your message."
                            break
                        case 401:
                            errorMessage = "AI service authentication failed. Please check the API key."
                            break
                        case 403:
                            errorMessage = "AI service permission denied. Access is restricted."
                            break
                        case 429:
                            errorMessage = "AI service quota exceeded or rate limited. Please try again later."
                            break
                        case 500:
                            errorMessage = "Sorry, an internal server error occurred. Please try again later."
                            break
                        case 503:
                            errorMessage = "AI service is temporarily experiencing high demand. Please try again in a moment."
                            break
                        default:
                            errorMessage = "Sorry, I'm having trouble connecting to my AI service right now."
                    }
                }

                setMessages((prev) => [
                    ...prev,
                    {
                        role: 'assistant',
                        text: errorMessage
                    }
                ])
                return
            }

            const replyText = data?.reply || "I didn't receive a response. Please try again."

            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    text: replyText
                }
            ])
        } catch (error) {
            console.error('[FRIDAY Frontend Error]', error)
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    text: "Sorry, I'm having trouble connecting to my AI service right now."
                }
            ])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <>
            {/* Floating FRIDAY Button */}
            {!isOpen && (
                <button
                    className="vaibhav-ai-button"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open FRIDAY AI assistant"
                    title="Open FRIDAY — Vaibhav's Personal AI Assistant"
                >
                    <FridayAvatar size={48} glow={false} />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="vaibhav-ai-chat" role="dialog" aria-label="FRIDAY chat interface">

                    {/* Header */}
                    <div className="vaibhav-ai-header">

                        <div className="ai-title">
                            <div className="ai-avatar">
                                <FridayAvatar size={38} isThinking={isLoading} glow={false} />
                            </div>

                            <div>
                                <h3>FRIDAY</h3>
                                <span>Vaibhav's Personal AI Assistant</span>
                            </div>
                        </div>

                        <button
                            className="ai-close"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chat"
                        >
                            ×
                        </button>

                    </div>

                    {/* Messages */}
                    <div className="vaibhav-ai-messages" role="log" aria-live="polite">

                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`ai-message ${message.role}`}
                            >
                                {message.text}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="ai-message assistant loading" aria-label="FRIDAY is thinking">
                                <FridayAvatar size={16} isThinking={true} glow={false} />
                                <span className="thinking-text">FRIDAY is thinking</span>
                                <span className="thinking-dots" aria-hidden="true">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </div>
                        )}

                        <div ref={messagesEndRef} />

                    </div>

                    {/* Input */}
                    <div className="vaibhav-ai-input">

                        <input
                            type="text"
                            placeholder={isLoading ? "FRIDAY is thinking..." : "Ask FRIDAY about Vaibhav..."}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                            aria-label="Ask FRIDAY a question"
                        />

                        <button
                            onClick={sendMessage}
                            disabled={isLoading || !input.trim()}
                            aria-label="Send message to FRIDAY"
                        >
                            ➤
                        </button>

                    </div>

                </div>
            )}
        </>
    )
}

export default VaibhavAI