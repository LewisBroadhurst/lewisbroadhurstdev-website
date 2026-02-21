import React from 'react';
import {Button, Card} from "@radix-ui/themes";

const WebsiteDesign = () => (
    <section className='flex flex-row gap-5'>
        <Card className='flex flex-col gap-2 border-2 p-4 rounded-lg justify-between'>
            <h2>Professional Build</h2>
            <ul className='list-disc list-outside pl-6'>
                <li>Up to 5 web pages</li>
                <li>Mobile friendly and performant website</li>
                <li>Deployment, Hosting, Domain Name handled for you</li>
                <li>Optional retainer for constant website updates</li>
            </ul>
            <Button>Enquire</Button>
        </Card>
        <Card className='flex flex-col gap-2 border-2 p-4 rounded-lg justify-between'>
            <h2>Premium Build</h2>
            <ul className='list-disc list-outside pl-6'>
                <li>Everything in Professional Build, plus</li>
                <li>Stripe Payment setup</li>
                <li>SEO Optimisation</li>
            </ul>
            <Button>Enquire</Button>
        </Card>
    </section>
);

export default WebsiteDesign;