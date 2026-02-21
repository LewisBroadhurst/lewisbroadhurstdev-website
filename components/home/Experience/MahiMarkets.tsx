import React from 'react'
import {Badge} from "@radix-ui/themes";

const technologies = [
    'Java',
    'SQL',
    'React',
    'AWS',
    'FX'
]

const MahiMarkets = () => {
    return <section className="flex flex-col gap-4 py-6">
        <section>
            <h3 className="text-lg">Mahi Markets - Full Stack Engineer</h3>
            <span className="text-[var(--gold-10)] text-xs">December 2022 - April 2024</span>
        </section>

        <ul className="list-disc list-outside pl-6 flex flex-col gap-1 text-[var(--gold-8)]">
            <li>Engineered FIX adaptors and REST APIs in Java 17; deployed trading systems to AWS-hosted Linux
                environments; completed full end-to-end connectivity testing with FX brokers and liquidity providers.
            </li>
            <li>Delivered trading-critical, trader-facing features, including data-intensive dashboards, interactive
                trade blotters, and modals used daily by FX traders.
            </li>
            <li>Extensively used Linux for system monitoring and log analysis while providing production support.</li>
        </ul>

        <ul className="flex flex-row gap-3 flex-wrap">
            {technologies.map(tech => (
                <Badge key={tech} color='orange'>
                    {tech}
                </Badge>
            ))}
        </ul>
    </section>
}

export default MahiMarkets
