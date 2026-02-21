import React from 'react'
import {Badge} from "@radix-ui/themes";

const technologies = [
    'Java',
    'SQL',
    'React',
    'JavaScript',
    'FX'
]

const BNTA = () => {
    return (
        <section className="flex flex-col gap-4 py-6">
            <section>
                <h3 className="text-lg">BNTA - Junior Full Stack Engineer</h3>
                <span className="text-[var(--gold-10)] text-xs">April - December 2022</span>
            </section>

            <ul className="list-disc list-outside pl-6 flex flex-col gap-1 text-[var(--gold-8)]">
                <li>Built a csv transformation interface that outputs relevant data in an .mdml format on UNIX for our
                    Murex platform, translating data from sources such as Refinitiv.
                </li>
                <li>Troubleshooting & re-writing SQL queries to understand the edge cases in which unexpected trades
                    passed through to our system.
                </li>
                <li>Completed an intensive 12 week training course covering React, Javascript, Java, Spring Boot,
                    PostgreSQL, Git/GitHub.
                </li>
            </ul>

            <ul className="flex flex-row gap-3 flex-wrap">
                {technologies.map(tech => (
                    <Badge key={tech} color='orange'>
                        {tech}
                    </Badge>
                ))}
            </ul>
        </section>
    )
}

export default BNTA
