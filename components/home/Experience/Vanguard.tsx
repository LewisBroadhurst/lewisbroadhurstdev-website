import React from 'react'
import {Badge} from "@radix-ui/themes";

const technologies = [
    'Java',
    'SQL',
    'Vue',
    'Typescript',
    'Equity - Portfolio Management',
]

const Vanguard = () => {
    return <section className="flex flex-col gap-4 py-6">
        <section>
            <h3 className="text-lg ">Vanguard - Full Stack Application Engineer</h3>
            <span className="text-[var(--gold-10)] text-xs">April 2023 - November 2025</span>
        </section>

        <ul className="list-disc list-outside pl-6 flex flex-col gap-1 text-[var(--gold-8)]">
            <li>Delivered and enhanced real-time Java 21 portfolio management systems used by portfolio managers
                globally, supporting trillions in assets with high scalability and resilience.
            </li>
            <li>Deployed and maintained event-driven AWS infrastructure (SQS, SNS, AppSync, Lambda) across multiple
                regions, ensuring high availability, fault tolerance, and low-latency trade data processing.
            </li>
            <li>Enhanced portfolio manager workflows via custom UI development, enabling seamless sign-off, allocation,
                and fund rebalancing through risk-controlled, one-click operations.
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
}

export default Vanguard
