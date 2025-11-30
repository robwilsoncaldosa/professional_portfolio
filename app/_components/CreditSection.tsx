type CreditLink = {
    label: string;
    url: string;
};

const CREDIT_LINKS: CreditLink[] = [
    { label: 'Brittany Chiang', url: 'https://brittanychiang.com/' },
    { label: 'Next.js', url: 'https://nextjs.org/' },
    { label: 'Tailwind CSS', url: 'https://tailwindcss.com/' },
    { label: 'Vercel', url: 'https://vercel.com/' },
    { label: 'Geist', url: 'https://vercel.com/font' },
];

function CreditLink({ label, url }: CreditLink) {
    return (
        <strong className="font-medium text-inherit">
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="!text-foreground relative inline-block transition-colors duration-300 hover:!text-foreground after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
            >
                {label}
            </a>
        </strong>
    );
}

export default function CreditSection() {
    return (
        <p className="max-w-lg text-sm px-6 mt-6 text-pretty transition-colors duration-300 has-[a:hover]:text-muted-foreground has-[a:hover]:[&_a]:text-foreground">
            Design greatly inspired by <CreditLink {...CREDIT_LINKS[0]} /> and coded from scratch by yours
            truly. Built with <CreditLink {...CREDIT_LINKS[1]} /> and{' '}
            <CreditLink {...CREDIT_LINKS[2]} />, deployed with <CreditLink {...CREDIT_LINKS[3]} />. All
            text is set in the <CreditLink {...CREDIT_LINKS[4]} /> typeface.
        </p>
    );
}
