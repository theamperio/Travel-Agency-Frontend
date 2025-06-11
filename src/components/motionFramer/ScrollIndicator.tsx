"use client"

import { motion, useScroll } from "motion/react"

export default function ScrollIndicator() {
    const { scrollYProgress } = useScroll()

    return (
        <motion.div
            id="scroll-indicator"
            style={{
                scaleX: scrollYProgress,
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                originX: 0,
                transformOrigin: "0%",
                backgroundColor: "#ff0088",
                zIndex: 1000,
            }}
        />
    )
}