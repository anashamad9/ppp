import { ChartBarStacked, MessageCircle, Vote } from 'lucide-react'
import { MessageIllustration } from "@/components/ui/illustrations/message-illustration"
import { PollIllustration } from "@/components/ui/illustrations/poll-illustration"
import { UptimeIllustration } from "@/components/ui/illustrations/uptime-illustration"
import { Card } from '@/components/ui/card'

export default function FeaturesSectionNine() {
    return (
        <section className="@container py-24">
            <div className="mx-auto w-full max-w-5xl px-6">
                <div className="@max-4xl:max-w-sm @max-4xl:mx-auto @4xl:grid-cols-3 grid gap-3 *:p-6">
                    <Card className="bg-card/50 grid grid-rows-[auto_1fr] space-y-12 overflow-hidden">
                        <div>
                            <MessageCircle className="fill-foreground/10 mb-5 size-4" />
                            <h3 className="text-foreground text-lg font-semibold">Real-time Messaging</h3>
                            <p className="text-muted-foreground mt-3">
                                Connect instantly with <span className="text-foreground font-medium">end-to-end encryption</span>.
                            </p>
                        </div>
                        <div className="relative -m-8 flex flex-col items-end justify-center p-8">
                            <MessageIllustration />
                        </div>
                    </Card>
                    <Card className="bg-card/50 grid grid-rows-[auto_1fr] space-y-12 overflow-hidden">
                        <div>
                            <ChartBarStacked className="fill-foreground/10 mb-5 size-4" />
                            <h3 className="text-foreground text-lg font-semibold">Performance Analytics</h3>
                            <p className="text-muted-foreground mt-3">
                                Track metrics with <span className="text-foreground font-medium">customizable dashboards</span>.
                            </p>
                        </div>
                        <div className="-m-8 flex flex-col items-end justify-center p-8">
                            <div className="mt-6 w-full">
                                <UptimeIllustration />
                            </div>
                        </div>
                    </Card>
                    <Card className="bg-card/50 grid grid-rows-[auto_1fr] space-y-12 overflow-hidden">
                        <div>
                            <Vote className="fill-foreground/10 mb-5 size-4" />
                            <h3 className="text-foreground text-lg font-semibold">Interactive Polling</h3>
                            <p className="text-muted-foreground mt-3">
                                Gather feedback with <span className="text-foreground font-medium">real-time results</span>.
                            </p>
                        </div>
                        <div className="-m-8 flex flex-col items-end justify-center p-8">
                            <div className="w-full px-2">
                                <PollIllustration />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}