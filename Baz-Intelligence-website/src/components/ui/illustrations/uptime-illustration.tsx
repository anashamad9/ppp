export const UptimeIllustration = () => (
    <div
        aria-hidden
        className="bg-illustration ring-border-illustration shadow-black/6.5 space-y-2.5 rounded-2xl p-4 shadow ring-1">
        <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Uptime</span>
            <span className="text-foreground">99.9%</span>
        </div>
        <div className="flex justify-between gap-px">
            {Array.from({ length: 38 }).map((_, index) => (
                <div
                    key={index}
                    className="[:nth-child(10)]:bg-foreground/25 [:nth-child(11)]:bg-foreground/25 [:nth-child(22)]:bg-foreground/25 [:nth-child(23)]:bg-foreground/25 [:nth-child(24)]:bg-foreground/25 [:nth-child(32)]:bg-foreground/25 h-7 w-1 rounded bg-emerald-500"></div>
            ))}
        </div>
    </div>
)