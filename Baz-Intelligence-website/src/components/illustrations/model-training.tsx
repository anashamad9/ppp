import { TrendingUp } from 'lucide-react'

export const ModelTrainingIllustration = () => {
    return (
        <div
            aria-hidden
            className="min-w-sm">
            <div className="perspective-dramatic flex flex-col gap-4">
                <div className="mask-radial-[100%_100%] mask-radial-from-75% mask-radial-at-top-left rotate-x-5 rotate-z-6 -rotate-4 pl-6 pt-1">
                    <div className="ring-border-illustration bg-background/75 shadow-black/6.5 rounded-t-2xl px-2 pt-4 shadow-lg ring-1">
                        <div className="text-muted-foreground mb-3 flex items-center gap-2.5 px-3 font-medium">Atmet knowledge training</div>

                        <div className="bg-card ring-border-illustration flex flex-col gap-5 rounded-t-xl px-5 pt-5 shadow ring-1">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground">Knowledge sync</span>
                                        <span className="text-foreground font-medium">82%</span>
                                    </div>
                                    <div className="bg-muted relative h-2 overflow-hidden rounded-full">
                                        <div className="bg-primary absolute inset-y-0 left-0 w-[82%] rounded-full"></div>
                                        <div className="bg-primary/30 absolute inset-y-0 left-[82%] w-[5%] animate-pulse"></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-muted/50 dark:bg-illustration rounded-lg border p-3">
                                        <div className="text-muted-foreground text-xs">Coverage</div>
                                        <div className="mt-1 flex items-baseline gap-1">
                                            <div className="text-foreground text-lg font-semibold">96.4%</div>
                                            <TrendingUp className="size-3 text-green-500" />
                                        </div>
                                    </div>
                                    <div className="bg-muted/50 dark:bg-illustration rounded-lg border p-3">
                                        <div className="text-muted-foreground text-xs">Drift</div>
                                        <div className="mt-1 flex items-baseline gap-1">
                                            <div className="text-foreground text-lg font-semibold">0.08</div>
                                            <div className="text-xs text-green-500">↓18%</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground">Sources 428/520</span>
                                        <span className="text-muted-foreground">Live update</span>
                                    </div>
                                    <div className="bg-muted/50 dark:bg-illustration flex h-16 items-end gap-0.5 rounded-lg border p-3">
                                        <div className="bg-primary/30 h-2/5 w-full rounded-sm"></div>
                                        <div className="bg-primary/40 h-3/5 w-full rounded-sm"></div>
                                        <div className="bg-primary/50 h-4/5 w-full rounded-sm"></div>
                                        <div className="bg-primary/60 h-full w-full rounded-sm"></div>
                                        <div className="bg-primary/70 h-4/5 w-full rounded-sm"></div>
                                        <div className="bg-primary h-full w-full animate-pulse rounded-sm"></div>
                                        <div className="bg-border h-2/5 w-full rounded-sm"></div>
                                        <div className="bg-border h-1/5 w-full rounded-sm"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModelTrainingIllustration
