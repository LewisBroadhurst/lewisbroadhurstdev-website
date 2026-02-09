import React from "react";
import Chip from "@/components/global/Chip";

const technologies = [
    'React',
    'Typescript',
    'FX - STIRT',
]

const Citi = () => {

    return (
        <section className="flex flex-col gap-4 py-6">
            <section>
                <h3 className="text-lg text-slate-200">Citi - Senior AVP</h3>
                <span className="text-slate-400 text-xs">November 2025 - Present</span>
            </section>

            <ul className="list-disc list-outside pl-6 flex flex-col gap-1 text-slate-400">
                <li>Drove codebase modernization by championing type safety and strengthening playwright testing, reducing runtime errors and improving system reliability.</li>
                <li>Refactored React, TypeScript, and CSS layers to simplify architecture, reducing lines of code by ~40% in many cases and removing redundant CSS.</li>
                <li>Contributed to the design and development of a shared component library to decouple styling and standardise UI/UX, improving long term maintainability of the codebase.</li>
            </ul>

            <ul className="flex flex-row gap-3 flex-wrap">
                {technologies.map(tech => (
                    <Chip key={tech} bgColour={'bg-cyan-900'}>
                        {tech}
                    </Chip>
                ))}
            </ul>
        </section>
    )
}

export default Citi;
