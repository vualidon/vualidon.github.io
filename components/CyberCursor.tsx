'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const CyberCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState('default');
    const [isVisible, setIsVisible] = useState(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Only show cursor when mouse moves
        const handleMouseActivity = () => {
            setIsVisible(true);

            // Reset the timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Hide cursor after 5 seconds of inactivity
            timeoutRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 5000);
        };

        // Initial activity
        handleMouseActivity();

        const mouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
            handleMouseActivity();
        };

        const mouseDown = () => setCursorVariant('click');
        const mouseUp = () => setCursorVariant('default');
        const mouseLeave = () => setIsVisible(false);
        const mouseEnter = () => setIsVisible(true);

        const handleLinkHover = () => setCursorVariant('hover');
        const handleLinkLeave = () => setCursorVariant('default');

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mousedown', mouseDown);
        window.addEventListener('mouseup', mouseUp);
        document.addEventListener('mouseleave', mouseLeave);
        document.addEventListener('mouseenter', mouseEnter);

        // Add hover effect to all links and buttons, but exclude canvas elements
        const links = document.querySelectorAll('a, button');
        links.forEach(link => {
            link.addEventListener('mouseenter', handleLinkHover);
            link.addEventListener('mouseleave', handleLinkLeave);
        });

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mousedown', mouseDown);
            window.removeEventListener('mouseup', mouseUp);
            document.removeEventListener('mouseleave', mouseLeave);
            document.removeEventListener('mouseenter', mouseEnter);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            links.forEach(link => {
                link.removeEventListener('mouseenter', handleLinkHover);
                link.removeEventListener('mouseleave', handleLinkLeave);
            });
        };
    }, []);

    // Update link hover effects when DOM changes, but with debounce
    useEffect(() => {
        let debounceTimeout: NodeJS.Timeout;

        const updateLinkListeners = () => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                const links = document.querySelectorAll('a, button');
                links.forEach(link => {
                    // Remove existing listeners to prevent duplicates
                    link.removeEventListener('mouseenter', () => setCursorVariant('hover'));
                    link.removeEventListener('mouseleave', () => setCursorVariant('default'));

                    // Add new listeners
                    link.addEventListener('mouseenter', () => setCursorVariant('hover'));
                    link.addEventListener('mouseleave', () => setCursorVariant('default'));
                });
            }, 200);
        };

        const observer = new MutationObserver(updateLinkListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        // Initial setup
        updateLinkListeners();

        return () => {
            observer.disconnect();
            clearTimeout(debounceTimeout);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            height: 32,
            width: 32,
            backgroundColor: 'rgba(0, 240, 255, 0)',
            mixBlendMode: 'normal',
            border: '2px solid rgba(0, 240, 255, 0.5)',
        },
        hover: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            height: 48,
            width: 48,
            backgroundColor: 'rgba(0, 240, 255, 0.1)',
            mixBlendMode: 'screen',
            border: '2px solid rgba(0, 240, 255, 0.8)',
        },
        click: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            height: 32,
            width: 32,
            backgroundColor: 'rgba(255, 0, 255, 0.2)',
            mixBlendMode: 'screen',
            border: '2px solid rgba(255, 0, 255, 0.8)',
        },
    };

    if (!isVisible) {
        return null;
    }

    return (
        <>
            <motion.div
                className="cyber-cursor fixed top-0 left-0 rounded-full pointer-events-none z-50"
                variants={variants}
                animate={cursorVariant}
                transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
            />

            <motion.div
                className="cyber-cursor-dot fixed top-0 left-0 rounded-full pointer-events-none z-50 bg-neon-blue"
                style={{
                    height: 8,
                    width: 8,
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                }}
                transition={{ type: 'spring', stiffness: 1000, damping: 28, mass: 0.1 }}
            />

            <style jsx global>{`
                body {
                    cursor: none;
                }
                
                a, button, input, textarea, select {
                    cursor: none;
                }
                
                canvas {
                    cursor: none !important;
                }
            `}</style>
        </>
    );
};

export default CyberCursor; 