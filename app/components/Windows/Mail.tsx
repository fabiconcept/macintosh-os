"use client";
import useAppStore from "@/store";
import clsx from "clsx";
import { AlertCircle, LucideChevronDown, LucideSend } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { sanitizeString } from "@/util";
import useSoundEffect from "@useverse/usesoundeffect";

export default function Mail() {
    const { theme } = useAppStore()
    const [subject, setSubject] = useState('');
    const [from, setFrom] = useState('');
    const [message, setMessage] = useState('');

    const sendSound = useSoundEffect("/audio/email-sent.mp3", {
        volume: 0.1,
    });
    
    // Track touched state for fields
    const [touched, setTouched] = useState({
        subject: false,
        from: false,
        message: false
    });

    // Validation logic
    const errors = useMemo(() => {
        return {
            subject: subject.trim() === '' ? "Subject is required" : "",
            from: from.trim() === '' ? "From email is required" : from && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from) ? "Invalid email address" : "",
            message: message.trim() === '' ? "Message is required" : ""
        };
    }, [subject, from, message]);

    const canSend = useMemo(() => {
        return subject && from && message && 
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from) === false;
    }, [subject, from, message]);

    const handleSend = async () => {
        // Mark all fields as touched when attempting to send
        setTouched({
            subject: true,
            from: true,
            message: true
        });
        
        const payload = {
            from: from,
            subject: subject,
            text: sanitizeString(message, {
                replaceChar: '-',
                preserveSpaces: true,
                preserveCase: true,
                maxLength: 500
            }),
        };

        try {
            await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            setSubject('');
            setFrom('');
            setMessage('');
        } catch (error) {
            console.error('Failed to send email:', error);
            throw error;
        }
    };

    const watchHandleSend = () => {
        if (!canSend) return;
        
        const promise = handleSend();
        toast.promise(promise, {
            loading: 'Sending email...',
            success: () => {
                sendSound.play();
                return 'Email sent successfully';
            },
            error: 'Failed to send email'
        });
    }
    
    const markAsTouched = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };
    
    return (
        <div className="flex flex-col text-sm">
            <div className="flex items-center gap-2 border-b border-foreground/30 pb-1">
                <span className="opacity-50">To:</span>
                <span className={clsx(
                        "flex items-center gap-1 rounded cursor-pointer py-0.5 px-1",
                        theme === "dark"? "bg-blue-50/20" : "bg-blue-300/40"
                    )}>
                    fabiconceptdev@gmail.com <LucideChevronDown size={15} />
                </span>
            </div>
            
            <div className="flex flex-col border-b border-foreground/30">
                <div className="flex items-center gap-2">
                    <span className="opacity-50">Subject:</span>
                    <input 
                        type="text" 
                        name="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        onBlur={() => markAsTouched('subject')}
                        placeholder="Enter subject" 
                        className="bg-transparent border-none outline-none flex-1 py-2 px-1"
                    />
                    {touched.subject && errors.subject && (
                        <span title={errors.subject}>
                            <AlertCircle className="text-red-500" size={15} />
                        </span>
                    )}
                </div>
            </div>
            
            <div className="flex flex-col border-b border-foreground/30">
                <div className="flex items-center gap-2">
                    <span className="opacity-50">From:</span>
                    <input 
                        type="text" 
                        name="from"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        onBlur={() => markAsTouched('from')}
                        placeholder="Your email address" 
                        className="bg-transparent border-none outline-none flex-1 py-2 px-1"
                    />
                    {touched.from && errors.from && (
                        <span title={errors.from}>
                            <AlertCircle className="text-red-500" size={15} />
                        </span>
                    )}
                </div>
            </div>
            
            <div className="flex flex-col flex-1 relative">
                <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onBlur={() => markAsTouched('message')}
                    maxLength={500}
                    placeholder="Enter your message"
                    className="bg-transparent border-none outline-none max-h-[220px] resize-none field-sizing-content py-2 px-1"
                />
                {touched.message && errors.message && (
                    <span className="absolute top-2 right-2" title={errors.message}>
                        <AlertCircle className="text-red-500" size={15} />
                    </span>
                )}
            </div>     

            <div className="absolute bottom-4 right-4 z-10">
                <button 
                    className={`h-14 w-14 border-[5px] border-background rounded-full grid place-items-center transition-all duration-300 ${
                        canSend 
                            ? "cursor-pointer hover:scale-110 shadow-2xl bg-blue-500 text-white active:scale-90 active:rotate-12" 
                            : "opacity-0"
                    }`} 
                    onClick={watchHandleSend}
                >
                    <LucideSend size={20} />
                </button>
            </div>      
        </div>
    );
}