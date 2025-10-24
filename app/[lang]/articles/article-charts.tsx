"use client"

import React from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ReferenceLine,
  ReferenceArea,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts"
import type { Locale } from "@/i18n-config"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Repeat, ShieldCheck, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

type ChartId =
  | "observation-loop"
  | "reliance-accuracy"
  | "policy-contaminated-labels"
  | "rollout-outcomes"
  | "mediators-heatmap"
  | "utility-accuracy"
  | "metric-compass"
  | "fries-oscillation"
  | "feature-contribution"
  | "reliance-tuning"
  | "guardrail-oscillations"
  | "accuracy-vs-reliance"
  | "feedback-mechanisms"
  | "rideshare-gap"
  | "concentration-engagement"
  | "credit-strategy-shift"
  | "finding-r-star"
  | "exploration-tradeoff"
  | "reliance-buckets"
  | "feedback-cycle"
  | "distribution-shift"
  | "policy-distribution-change"
  | "adoption-guardrail-series"

type ChartDefinition = {
  copy: Record<
    Locale,
    {
      title: string
      description: string
    }
  >
  render: (lang: Locale) => React.ReactNode
}

const localeMap: Record<Locale, string> = {
  en: "en-US",
  ar: "ar",
}

const percentSymbol: Record<Locale, string> = {
  en: "%",
  ar: "٪",
}

function formatNumberForLang(lang: Locale, value: number, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat(localeMap[lang], options).format(value)
}

const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]

function localizeDigits(lang: Locale, text: string) {
  if (lang !== "ar") {
    return text
  }
  return text
    .replace(/\d/g, (digit) => ARABIC_DIGITS[Number(digit)])
    .replace(/-/g, "−")
}

function wrapForLang(lang: Locale, text: string) {
  if (lang === "ar") {
    const localized = localizeDigits(lang, text)
    return `\u202E${localized}\u202C`
  }
  return text
}

function formatPercent(lang: Locale, value: number, fractionDigits = 0) {
  const formatted = formatNumberForLang(lang, value, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })
  return wrapForLang(lang, `${formatted}${percentSymbol[lang]}`)
}

function formatPercentFromRatio(lang: Locale, ratio: number, fractionDigits = 0) {
  return formatPercent(lang, ratio * 100, fractionDigits)
}

function formatUnitTick(
  lang: Locale,
  unit: string,
  value: number,
  options: Intl.NumberFormatOptions = {}
) {
  const formattedValue = formatNumberForLang(lang, value, options)
  const text =
    lang === "ar"
      ? `${formattedValue} ${unit}`
      : `${unit} ${formattedValue}`
  return wrapForLang(lang, text)
}

const chartRegistry: Record<ChartId, ChartDefinition> = {
  "observation-loop": {
    copy: {
      en: {
        title: "Chart 1 · Causal Flow",
        description: "Forecasts propagate through policy decisions before shaping observed sales.",
      },
      ar: {
        title: "الرسم 1 · تدفق سببي",
        description: "تنتشر التوقعات عبر قرارات السياسة قبل أن تشكل المبيعات المرصودة.",
      },
    },
    render: (lang) => <ObservationLoop lang={lang} />,
  },
  "reliance-accuracy": {
    copy: {
      en: {
        title: "Chart 2 · Reliance vs Accuracy",
        description: "Accuracy peaks near the reliance elbow; heavy reliance erodes foresight.",
      },
      ar: {
        title: "الرسم 2 · الاعتماد مقابل الدقة",
        description: "تبلغ الدقة ذروتها قرب عتبة الاعتماد، ثم يتدهور التنبؤ مع الاعتماد الثقيل.",
      },
    },
    render: (lang) => <RelianceAccuracyChart lang={lang} />,
  },
  "policy-contaminated-labels": {
    copy: {
      en: {
        title: "Chart 3 · Policy-Contaminated Labels",
        description: "Observed sales diverge from latent demand once policy feedback loops tighten.",
      },
      ar: {
        title: "الرسم 3 · تسميات ملوثة بالسياسة",
        description: "تنحرف المبيعات المرصودة عن الطلب الكامن عندما تضيق حلقات التغذية الراجعة.",
      },
    },
    render: (lang) => <PolicyContaminatedLabelsChart lang={lang} />,
  },
  "rollout-outcomes": {
    copy: {
      en: {
        title: "Chart 4 · Phased Rollout Outcomes",
        description: "Partial reliance improves operations; heavy reliance reverses profit gains.",
      },
      ar: {
        title: "الرسم 4 · نتائج النشر المرحلي",
        description: "يعزز الاعتماد الجزئي العمليات بينما يعكس الاعتماد الثقيل مكاسب الربحية.",
      },
    },
    render: (lang) => <RolloutOutcomesChart lang={lang} />,
  },
  "mediators-heatmap": {
    copy: {
      en: {
        title: "Chart 5 · Mediator Pressure Map",
        description: "Exposure and station load become dominant drivers after deployment.",
      },
      ar: {
        title: "الرسم 5 · خريطة ضغط الوسطاء",
        description: "يصبح التعرض وحمل المحطة محركات مهيمنة بعد النشر.",
      },
    },
    render: (lang) => <MediatorHeatmap lang={lang} />,
  },
  "utility-accuracy": {
    copy: {
      en: {
        title: "Chart 6 · Utility vs Accuracy Frontier",
        description: "Decision-aware models sustain higher utility with similar accuracy but lower volatility.",
      },
      ar: {
        title: "الرسم 6 · جبهة المنفعة مقابل الدقة",
        description: "تحافظ النماذج الواعية بالقرار على منفعة أعلى مع دقة مماثلة وتقلب أقل.",
      },
    },
    render: (lang) => <UtilityAccuracyChart lang={lang} />,
  },
  "metric-compass": {
    copy: {
      en: {
        title: "Chart 7 · Metric Compass",
        description: "A broader, balanced radar shows guardrails outperforming naive policies.",
      },
      ar: {
        title: "الرسم 7 · بوصلة المقاييس",
        description: "رادار أوسع ومتوازن يوضح تفوق الضوابط على السياسات البسيطة.",
      },
    },
    render: (lang) => <MetricCompassChart lang={lang} />,
  },
  "fries-oscillation": {
    copy: {
      en: {
        title: "Chart 8 · Reliance-Induced Oscillation",
        description: "High reliance amplifies oscillations until guardrails stabilize the loop.",
      },
      ar: {
        title: "الرسم 8 · تذبذب ناتج عن الاعتماد",
        description: "يضخم الاعتماد المرتفع التذبذبات حتى تستقر الضوابط الحلقة.",
      },
    },
    render: (lang) => <FriesOscillationChart lang={lang} />,
  },
  "feature-contribution": {
    copy: {
      en: {
        title: "Chart 9 · Feature Contribution Shift",
        description: "Feature importance pivots from demand signals to policy signals post-deployment.",
      },
      ar: {
        title: "الرسم 9 · تحول مساهمة الميزات",
        description: "تتحول أهمية الميزات من إشارات الطلب إلى إشارات السياسة بعد النشر.",
      },
    },
    render: (lang) => <FeatureContributionChart lang={lang} />,
  },
  "reliance-tuning": {
    copy: {
      en: {
        title: "Chart 10 · Reliance Tuning Experiment",
        description: "Utility peaks near R = 0.45 before declining as reliance over-rotates the system.",
      },
      ar: {
        title: "الرسم 10 · تجربة ضبط الاعتماد",
        description: "تبلغ المنفعة ذروتها قرب R = 0.45 قبل أن تنخفض عندما يفرط الاعتماد في توجيه النظام.",
      },
    },
    render: (lang) => <RelianceTuningChart lang={lang} />,
  },
  "guardrail-oscillations": {
    copy: {
      en: {
        title: "Chart 11 · Guardrails Reduce Ringing",
        description: "Guardrails dampen oscillation amplitude while keeping demand tracking aligned.",
      },
      ar: {
        title: "الرسم 11 · الضوابط تخفف الرنين",
        description: "تقلل الضوابط سعة التذبذب مع الحفاظ على اتساق تتبع الطلب.",
      },
    },
    render: (lang) => <GuardrailOscillationChart lang={lang} />,
  },
  "accuracy-vs-reliance": {
    copy: {
      en: {
        title: "Chart · Accuracy vs Reliance (R)",
        description: "Accuracy rises with reliance until the critical threshold R*, then declines as feedback dominates.",
      },
      ar: {
        title: "الرسم · الدقة مقابل الاعتماد (R)",
        description: "ترتفع الدقة مع الاعتماد حتى العتبة الحرجة R* ثم تتراجع عندما تهيمن التغذية الراجعة.",
      },
    },
    render: (lang) => <AccuracyVsRelianceChart lang={lang} />,
  },
  "feedback-mechanisms": {
    copy: {
      en: {
        title: "Chart · Three Feedback Mechanisms",
        description: "Selection bias, capacity shifts, and strategic behavior form reinforcing loops.",
      },
      ar: {
        title: "الرسم · ثلاث آليات للتغذية الراجعة",
        description: "التحيز في الاختيار وتحولات السعة والسلوك الاستراتيجي تشكل حلقات متعززة.",
      },
    },
    render: (lang) => <FeedbackMechanismsPanels lang={lang} />,
  },
  "rideshare-gap": {
    copy: {
      en: {
        title: "Chart · Ride Requests vs Price",
        description: "Forecasted demand and actual rides diverge as surge pricing oscillates.",
      },
      ar: {
        title: "الرسم · الطلبات مقابل السعر",
        description: "يتباعد الطلب المتوقع والرحلات الفعلية مع تذبذب تسعير الازدحام.",
      },
    },
    render: (lang) => <RideShareGapChart lang={lang} />,
  },
  "concentration-engagement": {
    copy: {
      en: {
        title: "Chart · Concentration vs Engagement Over Time",
        description: "Top-50 view share concentrates until exploration recovers CTR.",
      },
      ar: {
        title: "الرسم · التركّز مقابل التفاعل عبر الزمن",
        description: "يتركز استهلاك أفضل 50 عنواناً حتى يعيد الاستكشاف رفع معدل النقر.",
      },
    },
    render: (lang) => <ConcentrationEngagementChart lang={lang} />,
  },
  "credit-strategy-shift": {
    copy: {
      en: {
        title: "Chart · AUC and Default Rate Shift",
        description: "Model performance dips then recovers once audit bands restore signal.",
      },
      ar: {
        title: "الرسم · تغير AUC ومعدل التخلف",
        description: "يتراجع أداء النموذج ثم يتعافى بعد إعادة الإشارة عبر شريحة التدقيق.",
      },
    },
    render: (lang) => <CreditStrategyShiftChart lang={lang} />,
  },
  "finding-r-star": {
    copy: {
      en: {
        title: "Chart · Finding R* Experimentally",
        description: "Test error curves show how added exploration shifts the safe reliance point.",
      },
      ar: {
        title: "الرسم · إيجاد R* تجريبياً",
        description: "منحنيات الخطأ توضح كيف يحرك الاستكشاف الإضافي نقطة الاعتماد الآمن.",
      },
    },
    render: (lang) => <FindingRStarChart lang={lang} />,
  },
  "exploration-tradeoff": {
    copy: {
      en: {
        title: "Chart · Short-Term Hit, Long-Term Gain",
        description: "Comparing CTR and long-run forecast accuracy with and without exploration.",
      },
      ar: {
        title: "الرسم · خسارة قصيرة ومكسب طويل الأجل",
        description: "مقارنة CTR ودقة التنبؤ طويلة الأمد مع الاستكشاف ودونه.",
      },
    },
    render: (lang) => <ExplorationTradeoffChart lang={lang} />,
  },
  "reliance-buckets": {
    copy: {
      en: {
        title: "Chart · Reliance Buckets Experiment",
        description: "Bucketed RMSE against reliance with quadratic fit and shadow-model baseline.",
      },
      ar: {
        title: "الرسم · تجربة دلاء الاعتماد",
        description: "RMSE بحسب الدلاء مقابل الاعتماد مع ملاءمة تربيعية وخط أساس لنموذج الظل.",
      },
    },
    render: (lang) => <RelianceBucketsChart lang={lang} />,
  },
  "feedback-cycle": {
    copy: {
      en: {
        title: "Chart · Feedback Cycle in ML Predictions",
        description: "Predict → Act → React → Update in one closed loop around the world you are steering.",
      },
      ar: {
        title: "الرسم · دورة التغذية الراجعة في تنبؤات التعلم الآلي",
        description: "تنبأ ← تصرف ← تفاعل ← حدّث في حلقة مغلقة تدور حول العالم الذي نعيد تشكيله.",
      },
    },
    render: (lang) => <FeedbackCycleDiagram lang={lang} />,
  },
  "distribution-shift": {
    copy: {
      en: {
        title: "Chart · How Feedback Shifts Data",
        description: "Side-by-side comparison of training distribution before deployment and after policy effects.",
      },
      ar: {
        title: "الرسم · كيف تغيّر التغذية الراجعة البيانات",
        description: "مقارنة جانبية بين توزيع التدريب قبل النشر وبعد تأثير السياسة.",
      },
    },
    render: (lang) => <DistributionShiftChart lang={lang} />,
  },
  "policy-distribution-change": {
    copy: {
      en: {
        title: "Chart · Outcome Shape Before vs After Policy",
        description: "Overlapping distributions show how the policy changed the mean and the tails.",
      },
      ar: {
        title: "الرسم · شكل النتائج قبل السياسة وبعدها",
        description: "توزيعات متداخلة توضح كيف غيّرت السياسة المتوسط والأطراف.",
      },
    },
    render: (lang) => <PolicyDistributionChangeChart lang={lang} />,
  },
  "adoption-guardrail-series": {
    copy: {
      en: {
        title: "Chart · Adoption vs Outcome With Guardrails",
        description: "Shaded guardrail periods align with calmer wait times as adoption rises.",
      },
      ar: {
        title: "الرسم · التبنّي مقابل النتيجة مع الحواجز الواقية",
        description: "فترات التظليل للحواجز تتزامن مع هدوء أزمنة الانتظار مع ارتفاع التبنّي.",
      },
    },
    render: (lang) => <AdoptionGuardrailSeries lang={lang} />,
  },
}

export function ArticleChartBlock({ id, lang }: { id: string; lang: Locale }) {
  if (!isChartId(id)) {
    return null
  }

  const chart = chartRegistry[id]
  const { title, description } = chart.copy[lang]

  return (
    <Card className="not-prose border border-border/60 bg-muted/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold leading-tight">{title}</CardTitle>
        <CardDescription className="text-muted-foreground text-xs sm:text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div
          className="rounded-lg border border-dashed border-border/60 bg-background/70 p-3 sm:p-4"
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          {chart.render(lang)}
        </div>
      </CardContent>
    </Card>
  )
}

function isChartId(value: string): value is ChartId {
  return value in chartRegistry
}

function ObservationLoop({ lang }: { lang: Locale }) {
  const steps = [
    { key: "forecast", label: lang === "ar" ? "التوقع" : "Forecast" },
    { key: "policy", label: lang === "ar" ? "السياسة" : "Policy" },
  ]

  const mediators =
    lang === "ar"
      ? ["التعرض", "السعر", "التوفر"]
      : ["Exposure", "Price", "Availability"]

  const salesLabel = lang === "ar" ? "المبيعات المرصودة" : "Observed Sales"

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <Badge variant="secondary" className="px-3 py-1 text-xs font-medium uppercase tracking-wide">
              {step.label}
            </Badge>
            {index < steps.length - 1 ? (
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            ) : null}
          </React.Fragment>
        ))}
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        <div className="flex items-center gap-1 rounded-full border border-border/60 bg-muted/60 px-3 py-1 text-xs font-medium">
          {mediators.map((mediator, idx) => (
            <React.Fragment key={mediator}>
              <span>{mediator}</span>
              {idx < mediators.length - 1 ? (
                <span className="text-muted-foreground">•</span>
              ) : null}
            </React.Fragment>
          ))}
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        <Badge className="px-3 py-1 text-xs font-semibold uppercase tracking-wide">{salesLabel}</Badge>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        {lang === "ar"
          ? "كل خطوة تعيد تشكيل البيانات التي ستدرّب الجولة التالية من النموذج."
          : "Each hop reshapes the data that will train the next model iteration."}
      </p>
    </div>
  )
}

function RelianceAccuracyChart({ lang }: { lang: Locale }) {
  const data = [
    { reliance: 0.0, accuracy: 0.32 },
    { reliance: 0.1, accuracy: 0.45 },
    { reliance: 0.2, accuracy: 0.58 },
    { reliance: 0.3, accuracy: 0.68 },
    { reliance: 0.4, accuracy: 0.75 },
    { reliance: 0.5, accuracy: 0.79 },
    { reliance: 0.6, accuracy: 0.8 },
    { reliance: 0.7, accuracy: 0.77 },
    { reliance: 0.8, accuracy: 0.7 },
    { reliance: 0.9, accuracy: 0.6 },
    { reliance: 1.0, accuracy: 0.48 },
  ]

  const config = {
    accuracy: {
      label: lang === "ar" ? "الدقة المتوقعة" : "Expected accuracy",
      color: "hsl(216, 91%, 60%)",
    },
    unsafe: {
      label: lang === "ar" ? "اعتماد غير آمن" : "Unsafe reliance",
      color: "hsl(0, 84%, 60%)",
    },
  }

  return (
    <ChartContainer config={config}>
      <AreaChart data={data} margin={{ left: -12, right: 0, top: 10 }}>
        <defs>
          <linearGradient id="accuracyArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="var(--color-accuracy)" stopOpacity={0.35} />
            <stop offset="95%" stopColor="var(--color-accuracy)" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 16%, 82%)" />
        <XAxis
          dataKey="reliance"
          tickFormatter={(value) =>
            wrapForLang(
              lang,
              formatNumberForLang(lang, value, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
            )
          }
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <YAxis
          domain={[0.3, 0.85]}
          tickFormatter={(value) => formatPercentFromRatio(lang, value)}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <ReferenceLine
          x={0.55}
          stroke="var(--color-unsafe)"
          strokeDasharray="4 4"
          label={{
            value: wrapForLang(lang, lang === "ar" ? "عتبة R*" : "R* elbow"),
            position: "insideTopRight",
            fill: "var(--color-unsafe)",
            fontSize: 10,
          }}
        />
        <Area type="monotone" dataKey="accuracy" stroke="var(--color-accuracy)" fill="url(#accuracyArea)" />
        <ChartTooltip
          cursor={{ strokeDasharray: "4 4" }}
          content={
            <ChartTooltipContent
              formatter={(value: number | string) => formatPercentFromRatio(lang, Number(value))}
            />
          }
        />
      </AreaChart>
    </ChartContainer>
  )
}

function PolicyContaminatedLabelsChart({ lang }: { lang: Locale }) {
  const data = [
    { period: lang === "ar" ? "قبل النشر" : "Pre-deploy", latent: 118, observed: 117 },
    { period: lang === "ar" ? "ترويج" : "Promo boost", latent: 120, observed: 138 },
    { period: lang === "ar" ? "ضغط السعة" : "Capacity strain", latent: 123, observed: 109 },
    { period: lang === "ar" ? "استبدال" : "Substitution", latent: 125, observed: 115 },
    { period: lang === "ar" ? "استقرار" : "Steady state", latent: 127, observed: 130 },
  ]

  const config = {
    latent: {
      label: lang === "ar" ? "الطلب الكامن" : "Latent demand",
      color: "hsl(160, 84%, 40%)",
    },
    observed: {
      label: lang === "ar" ? "المبيعات المرصودة" : "Observed sales",
      color: "hsl(27, 96%, 61%)",
    },
  }

  return (
    <ChartContainer config={config}>
      <LineChart data={data} margin={{ left: -12, right: 8, top: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 16%, 82%)" />
        <XAxis dataKey="period" tick={{ fontSize: 10 }} stroke="hsl(215, 16%, 52%)" />
        <YAxis stroke="hsl(215, 16%, 52%)" tick={{ fontSize: 10 }} />
        <Line type="monotone" dataKey="latent" stroke="var(--color-latent)" strokeWidth={2} dot={{ r: 3 }} />
        <Line type="monotone" dataKey="observed" stroke="var(--color-observed)" strokeWidth={2} dot={{ r: 3 }} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
    </ChartContainer>
  )
}

function RolloutOutcomesChart({ lang }: { lang: Locale }) {
  const data = [
    {
      phase: lang === "ar" ? "ظل" : "Shadow",
      reliance: 0.0,
      profit: 0,
      mape: 31,
      waste: 0,
      sla: 0,
    },
    {
      phase: lang === "ar" ? "جزئي" : "Partial",
      reliance: 0.4,
      profit: 8,
      mape: 18,
      waste: -22,
      sla: -19,
    },
    {
      phase: lang === "ar" ? "ثقيل" : "Heavy",
      reliance: 0.85,
      profit: -4,
      mape: 24,
      waste: -6,
      sla: 3,
    },
  ]

  const config = {
    profit: {
      label: lang === "ar" ? "تغير الربح" : "Profit change",
      color: "hsl(152, 76%, 40%)",
    },
    mape: {
      label: lang === "ar" ? "MAPE" : "MAPE",
      color: "hsl(222, 89%, 55%)",
    },
    waste: {
      label: lang === "ar" ? "تغير الهدر" : "Waste change",
      color: "hsl(40, 90%, 55%)",
    },
    sla: {
      label: lang === "ar" ? "تغير SLA" : "SLA change",
      color: "hsl(350, 86%, 60%)",
    },
  }

  return (
    <ChartContainer config={config}>
      <BarChart data={data} margin={{ left: -12, right: 8, top: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 16%, 82%)" vertical={false} />
        <XAxis dataKey="phase" tick={{ fontSize: 10 }} stroke="hsl(215, 16%, 52%)" />
        <YAxis
          yAxisId="left"
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
          tickFormatter={(value) =>
            wrapForLang(lang, formatNumberForLang(lang, value, { maximumFractionDigits: 0 }))
          }
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
          tickFormatter={(value) =>
            wrapForLang(lang, formatNumberForLang(lang, value, { maximumFractionDigits: 0 }))
          }
        />
        <Bar yAxisId="left" dataKey="mape" fill="var(--color-mape)" radius={[4, 4, 0, 0]} />
        <Bar yAxisId="right" dataKey="profit" fill="var(--color-profit)" radius={[4, 4, 0, 0]} />
        <Bar yAxisId="right" dataKey="waste" fill="var(--color-waste)" radius={[4, 4, 0, 0]} />
        <Bar yAxisId="right" dataKey="sla" fill="var(--color-sla)" radius={[4, 4, 0, 0]} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  )
}

function MediatorHeatmap({ lang }: { lang: Locale }) {
  const categories = lang === "ar" ? ["بطاطا", "سلطات", "لفائف", "حلويات"] : ["Fries", "Salads", "Wraps", "Desserts"]
  const mediators = lang === "ar" ? ["تعرض", "توافر", "زمن انتظار", "سعر"] : ["Exposure", "Availability", "Wait time", "Price"]

  const values = [
    { category: categories[0], Exposure: 0.86, Availability: 0.28, "Wait time": 0.62, Price: 0.18 },
    { category: categories[1], Exposure: 0.44, Availability: 0.71, "Wait time": 0.53, Price: 0.26 },
    { category: categories[2], Exposure: 0.58, Availability: 0.36, "Wait time": 0.42, Price: 0.31 },
    { category: categories[3], Exposure: 0.35, Availability: 0.48, "Wait time": 0.27, Price: 0.22 },
  ]

  const translatedKey = (key: string) => {
    if (lang === "ar") {
      switch (key) {
        case "Exposure":
          return "تعرض"
        case "Availability":
          return "توافر"
        case "Wait time":
          return "زمن انتظار"
        case "Price":
          return "سعر"
        default:
          return key
      }
    }
    return key
  }

  const formatValue = (value: number) => formatPercentFromRatio(lang, value)

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[360px] border-collapse text-xs">
        <thead>
          <tr>
            <th className="p-2 text-start text-muted-foreground">{lang === "ar" ? "فئة" : "Category"}</th>
            {mediators.map((mediator) => (
              <th key={mediator} className="p-2 text-start text-muted-foreground">
                {mediator}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values.map((row) => (
            <tr key={row.category} className="border-t border-border/60">
              <td className="p-2 font-medium text-foreground">{row.category}</td>
              {["Exposure", "Availability", "Wait time", "Price"].map((key) => {
                const value = (row as Record<string, number>)[key]
                return (
                  <td key={key} className="p-1">
                    <div
                      className={cn(
                        "flex h-12 items-center justify-center rounded-md text-[11px] font-medium text-foreground/90",
                        "transition-colors"
                      )}
                      style={{
                        background: `linear-gradient(135deg, hsla(215, 90%, 60%, ${value * 0.9}) 0%, hsla(215, 90%, 60%, ${value * 0.4}) 100%)`,
                      }}
                    >
                      <span>{formatValue(value)}</span>
                    </div>
                    <span className="sr-only">{translatedKey(key)}</span>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function UtilityAccuracyChart({ lang }: { lang: Locale }) {
  const data = [
    { label: lang === "ar" ? "سياسة بسيطة" : "Naive policy", accuracy: 0.74, utility: 0.62, volatility: 0.32 },
    { label: lang === "ar" ? "نموذج واعٍ" : "Decision-aware", accuracy: 0.72, utility: 0.81, volatility: 0.18 },
    { label: lang === "ar" ? "مع ضوابط" : "Guardrails", accuracy: 0.7, utility: 0.78, volatility: 0.2 },
  ]

  const config = {
    accuracy: {
      label: lang === "ar" ? "الدقة" : "Accuracy",
      color: "hsl(220, 89%, 60%)",
    },
    utility: {
      label: lang === "ar" ? "المنفعة" : "Utility",
      color: "hsl(158, 78%, 42%)",
    },
  }

  return (
    <ChartContainer config={config}>
      <ScatterChart margin={{ left: -12, right: 8, top: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 16%, 82%)" />
        <XAxis
          dataKey="accuracy"
          tickFormatter={(value) => formatPercentFromRatio(lang, value)}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <YAxis
          dataKey="utility"
          tickFormatter={(value) => formatPercentFromRatio(lang, value)}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <ZAxis dataKey="volatility" range={[120, 300]} />
        <Scatter data={data} fill="var(--color-utility)" />
        <ChartTooltip
          cursor={{ strokeDasharray: "4 4" }}
          content={
            <ChartTooltipContent
              formatter={(value: number | string, name) => {
                const numericValue = Number(value)
                if (!Number.isFinite(numericValue)) {
                  return value
                }
                return formatPercentFromRatio(lang, numericValue)
              }}
              labelFormatter={(_, items) =>
                wrapForLang(lang, items?.[0]?.payload?.label ?? "")
              }
            />
          }
        />
      </ScatterChart>
    </ChartContainer>
  )
}

function MetricCompassChart({ lang }: { lang: Locale }) {
  const data = [
    {
      metric: lang === "ar" ? "منفعة" : "Utility",
      naive: 0.54,
      aware: 0.82,
    },
    {
      metric: lang === "ar" ? "استقرار" : "Stability",
      naive: 0.41,
      aware: 0.79,
    },
    {
      metric: lang === "ar" ? "عدالة" : "Fairness",
      naive: 0.48,
      aware: 0.73,
    },
    {
      metric: lang === "ar" ? "معايرة" : "Calibration",
      naive: 0.52,
      aware: 0.76,
    },
    {
      metric: lang === "ar" ? "رصد انجراف" : "Drift sensing",
      naive: 0.44,
      aware: 0.7,
    },
  ]

  const config = {
    naive: {
      label: lang === "ar" ? "سياسة بسيطة" : "Naive",
      color: "hsl(215, 16%, 70%)",
    },
    aware: {
      label: lang === "ar" ? "ضوابط" : "Guardrailed",
      color: "hsl(262, 83%, 65%)",
    },
  }

  return (
    <ChartContainer config={config}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis
          dataKey="metric"
          tick={{ fontSize: 10 }}
          tickFormatter={(value: string) => wrapForLang(lang, value)}
        />
        <PolarRadiusAxis
          domain={[0.3, 0.9]}
          tick={{ fontSize: 10 }}
          tickFormatter={(value) => formatPercentFromRatio(lang, value)}
        />
        <Radar name="naive" dataKey="naive" stroke="var(--color-naive)" fill="var(--color-naive)" fillOpacity={0.3} />
        <Radar name="aware" dataKey="aware" stroke="var(--color-aware)" fill="var(--color-aware)" fillOpacity={0.45} />
        <ChartLegend content={<ChartLegendContent />} />
      </RadarChart>
    </ChartContainer>
  )
}

function FriesOscillationChart({ lang }: { lang: Locale }) {
  const data = [
    { week: 1, forecast: 1.0, observed: 1.05 },
    { week: 2, forecast: 1.18, observed: 1.25 },
    { week: 3, forecast: 1.3, observed: 1.12 },
    { week: 4, forecast: 1.22, observed: 0.95 },
    { week: 5, forecast: 1.12, observed: 1.02 },
    { week: 6, forecast: 1.08, observed: 1.08 },
  ]

  const config = {
    forecast: {
      label: lang === "ar" ? "توقع" : "Forecast",
      color: "hsl(210, 92%, 54%)",
    },
    observed: {
      label: lang === "ar" ? "مبيعات" : "Observed",
      color: "hsl(12, 89%, 62%)",
    },
  }

  return (
    <ChartContainer config={config}>
      <LineChart data={data} margin={{ left: -12, right: 8, top: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 16%, 82%)" />
        <XAxis
          dataKey="week"
          tickFormatter={(value) => {
            const label = lang === "ar" ? "أسبوع" : "Week"
            return formatUnitTick(lang, label, value, { maximumFractionDigits: 0 })
          }}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <YAxis
          domain={[0.8, 1.35]}
          tickFormatter={(value) => formatPercent(lang, value * 100, 0)}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <ReferenceLine
          y={1}
          stroke="hsl(160, 80%, 42%)"
          strokeDasharray="4 4"
          label={{
            value: wrapForLang(lang, lang === "ar" ? "الأساس" : "Baseline"),
            position: "insideTopLeft",
            fontSize: 10,
            fill: "hsl(160, 80%, 30%)",
          }}
        />
        <Line type="monotone" dataKey="forecast" stroke="var(--color-forecast)" strokeWidth={2} dot={{ r: 3 }} />
        <Line type="monotone" dataKey="observed" stroke="var(--color-observed)" strokeWidth={2} dot={{ r: 3 }} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value: number | string) => formatPercent(lang, Number(value) * 100, 0)}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
    </ChartContainer>
  )
}

function FeatureContributionChart({ lang }: { lang: Locale }) {
  const data = [
    { feature: lang === "ar" ? "اتجاه الطلب" : "Demand trend", pre: 0.32, post: 0.14 },
    { feature: lang === "ar" ? "رتبة التعرض" : "Exposure rank", pre: 0.18, post: 0.46 },
    { feature: lang === "ar" ? "تحميل المحطة" : "Station load", pre: 0.12, post: 0.3 },
    { feature: lang === "ar" ? "السعر" : "Price", pre: 0.1, post: 0.22 },
    { feature: lang === "ar" ? "فترة زمنية" : "Time bucket", pre: 0.28, post: 0.18 },
  ]

  const config = {
    pre: {
      label: lang === "ar" ? "قبل النشر" : "Pre-deployment",
      color: "hsl(215, 16%, 70%)",
    },
    post: {
      label: lang === "ar" ? "بعد النشر" : "Post-deployment",
      color: "hsl(340, 82%, 60%)",
    },
  }

  return (
    <ChartContainer config={config}>
      <BarChart data={data} layout="vertical" margin={{ left: 10, right: 16, top: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 16%, 82%)" />
        <XAxis
          type="number"
          domain={[0, 0.5]}
          tickFormatter={(value) => formatPercentFromRatio(lang, value)}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <YAxis type="category" dataKey="feature" width={lang === "ar" ? 110 : 130} tick={{ fontSize: 10 }} />
        <Bar dataKey="pre" fill="var(--color-pre)" radius={[0, 4, 4, 0]} barSize={12} />
        <Bar dataKey="post" fill="var(--color-post)" radius={[0, 4, 4, 0]} barSize={12} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value: number | string) => formatPercentFromRatio(lang, Number(value))}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  )
}

function RelianceTuningChart({ lang }: { lang: Locale }) {
  const data = [
    { reliance: 0.1, utility: 0.42 },
    { reliance: 0.2, utility: 0.58 },
    { reliance: 0.3, utility: 0.69 },
    { reliance: 0.4, utility: 0.78 },
    { reliance: 0.45, utility: 0.82 },
    { reliance: 0.5, utility: 0.79 },
    { reliance: 0.6, utility: 0.68 },
    { reliance: 0.7, utility: 0.52 },
    { reliance: 0.8, utility: 0.41 },
  ]

  const config = {
    utility: {
      label: lang === "ar" ? "المنفعة النسبية" : "Relative utility",
      color: "hsl(222, 89%, 55%)",
    },
  }

  return (
    <ChartContainer config={config}>
      <AreaChart data={data} margin={{ left: -12, right: 8, top: 10 }}>
        <defs>
          <linearGradient id="utilityArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="var(--color-utility)" stopOpacity={0.35} />
            <stop offset="95%" stopColor="var(--color-utility)" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 16%, 82%)" />
        <XAxis
          dataKey="reliance"
          tickFormatter={(value) =>
            wrapForLang(
              lang,
              formatNumberForLang(lang, value, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            )
          }
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <YAxis
          domain={[0.35, 0.85]}
          tickFormatter={(value) => formatPercentFromRatio(lang, value)}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <ReferenceLine
          x={0.45}
          stroke="hsl(0, 84%, 60%)"
          strokeDasharray="4 4"
          label={{
            value: wrapForLang(lang, lang === "ar" ? "ذروة المنفعة" : "Utility peak"),
            position: "insideTopLeft",
            fontSize: 10,
            fill: "hsl(0, 70%, 45%)",
          }}
        />
        <Area type="monotone" dataKey="utility" stroke="var(--color-utility)" fill="url(#utilityArea)" />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value: number | string) => formatPercentFromRatio(lang, Number(value))}
            />
          }
        />
      </AreaChart>
    </ChartContainer>
  )
}

function GuardrailOscillationChart({ lang }: { lang: Locale }) {
  const data = [
    { cycle: 1, uncontrolled: 1.18, guardrailed: 1.06 },
    { cycle: 2, uncontrolled: 1.32, guardrailed: 1.08 },
    { cycle: 3, uncontrolled: 0.92, guardrailed: 0.98 },
    { cycle: 4, uncontrolled: 1.27, guardrailed: 1.04 },
    { cycle: 5, uncontrolled: 0.88, guardrailed: 0.97 },
    { cycle: 6, uncontrolled: 1.22, guardrailed: 1.03 },
  ]

  const config = {
    uncontrolled: {
      label: lang === "ar" ? "بدون ضوابط" : "No guardrails",
      color: "hsl(350, 84%, 60%)",
    },
    guardrailed: {
      label: lang === "ar" ? "مع ضوابط" : "Guardrails",
      color: "hsl(158, 78%, 42%)",
    },
  }

  return (
    <ChartContainer config={config}>
      <LineChart data={data} margin={{ left: -12, right: 8, top: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 16%, 82%)" />
        <XAxis
          dataKey="cycle"
          tickFormatter={(value) => formatUnitTick(lang, lang === "ar" ? "دورة" : "Cycle", value, {
            maximumFractionDigits: 0,
          })}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <YAxis
          domain={[0.85, 1.35]}
          tickFormatter={(value) => formatPercent(lang, value * 100, 0)}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <Line type="monotone" dataKey="uncontrolled" stroke="var(--color-uncontrolled)" strokeWidth={2} dot={{ r: 3 }} />
        <Line type="monotone" dataKey="guardrailed" stroke="var(--color-guardrailed)" strokeWidth={2} dot={{ r: 3 }} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value: number | string) => formatPercent(lang, Number(value) * 100, 0)}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
    </ChartContainer>
  )
}

function AccuracyVsRelianceChart({ lang }: { lang: Locale }) {
  const data = [
    { reliance: 0, accuracy: 60 },
    { reliance: 10, accuracy: 70 },
    { reliance: 20, accuracy: 78 },
    { reliance: 30, accuracy: 83 },
    { reliance: 40, accuracy: 85 },
    { reliance: 50, accuracy: 85 },
    { reliance: 60, accuracy: 82 },
    { reliance: 70, accuracy: 75 },
    { reliance: 80, accuracy: 65 },
    { reliance: 90, accuracy: 58 },
    { reliance: 100, accuracy: 55 },
  ]

  const config = {
    accuracy: {
      label: lang === "ar" ? "دقة التنبؤ" : "Forecast accuracy",
      color: "hsl(216, 91%, 60%)",
    },
  }

  return (
    <ChartContainer config={config}>
      <LineChart data={data} margin={{ left: -4, right: 12, top: 12 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 16%, 82%)" />
        <XAxis
          dataKey="reliance"
          tickFormatter={(value) => formatPercent(lang, value)}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <YAxis
          domain={[50, 90]}
          tickFormatter={(value) => formatPercent(lang, value)}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <ReferenceLine
          x={50}
          stroke="hsl(0, 84%, 60%)"
          strokeDasharray="4 4"
          label={{
            value: wrapForLang(lang, lang === "ar" ? "عتبة الاعتماد الحرجة" : "Critical Reliance Threshold"),
            position: "insideTopRight",
            fontSize: 10,
            fill: "hsl(0, 70%, 45%)",
          }}
        />
        <Line type="monotone" dataKey="accuracy" stroke="var(--color-accuracy)" strokeWidth={2} dot={{ r: 3 }} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value: number | string) => formatPercent(lang, Number(value))}
            />
          }
        />
      </LineChart>
    </ChartContainer>
  )
}

function FeedbackMechanismsPanels({ lang }: { lang: Locale }) {
  const panels = [
    {
      key: "selection",
      title: lang === "ar" ? "تحيز الاختيار" : "Selection Bias",
      icon: <TrendingUp className="h-5 w-5 text-primary" />,
      steps:
        lang === "ar"
          ? ["توصية", "نقرات أعلى", "بيانات تدريب منحازة", "تعزيز التوصية"]
          : ["Recommend", "Clicks up", "Training skews", "Stronger recommend"],
    },
    {
      key: "capacity",
      title: lang === "ar" ? "تحول السعة" : "Capacity Shift",
      icon: <Repeat className="h-5 w-5 text-primary" />,
      steps:
        lang === "ar"
          ? ["توقع ↑", "السعر ↑", "الطلب ↓", "توقع مختلف"]
          : ["Forecast ↑", "Price ↑", "Demand ↓", "Forecast drifts"],
    },
    {
      key: "strategy",
      title: lang === "ar" ? "سلوك استراتيجي" : "Strategic Behavior",
      icon: <ShieldCheck className="h-5 w-5 text-primary" />,
      steps:
        lang === "ar"
          ? ["قاعدة منشورة", "الناس يتكيفون", "الميزات تتحول", "النموذج ينحرف"]
          : ["Rule published", "People adapt", "Features shift", "Model drifts"],
    },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {panels.map((panel) => (
        <div
          key={panel.key}
          className="flex h-full flex-col gap-3 rounded-lg border border-border/60 bg-background/70 p-4 text-xs shadow-sm"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              {panel.icon}
            </span>
            <span>{panel.title}</span>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-2 text-muted-foreground">
            {panel.steps.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-[10px] font-semibold uppercase text-foreground">
                  {index + 1}
                </div>
                <span className="text-xs font-medium">{step}</span>
                {index < panel.steps.length - 1 ? (
                  <ArrowRight className="h-3.5 w-3.5 text-border" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function RideShareGapChart({ lang }: { lang: Locale }) {
  const data = [
    { day: 1, predicted: 12000, actual: 10000 },
    { day: 2, predicted: 11800, actual: 9800 },
    { day: 3, predicted: 11600, actual: 9500 },
    { day: 4, predicted: 11400, actual: 9300 },
    { day: 5, predicted: 11200, actual: 9000 },
    { day: 6, predicted: 11000, actual: 8800 },
    { day: 7, predicted: 10800, actual: 8600 },
    { day: 8, predicted: 10000, actual: 8400 },
    { day: 9, predicted: 9800, actual: 8300 },
    { day: 10, predicted: 9600, actual: 8200 },
    { day: 11, predicted: 9400, actual: 8100 },
    { day: 12, predicted: 9200, actual: 8050 },
    { day: 13, predicted: 9100, actual: 8020 },
    { day: 14, predicted: 9000, actual: 8000 },
  ]

  const surgeMarkers = [
    { day: 1, label: lang === "ar" ? "زيادة 1.4×" : "Surge 1.4×" },
    { day: 8, label: lang === "ar" ? "زيادة 1.2×" : "Surge 1.2×" },
  ]

  const config = {
    predicted: {
      label: lang === "ar" ? "الرحلات المتوقعة" : "Predicted rides",
      color: "hsl(210, 92%, 54%)",
    },
    actual: {
      label: lang === "ar" ? "الرحلات الفعلية" : "Actual rides",
      color: "hsl(12, 89%, 62%)",
    },
  }

  return (
    <div className="space-y-3">
      <ChartContainer config={config}>
        <LineChart data={data} margin={{ left: -4, right: 12, top: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 16%, 82%)" />
        <XAxis
          dataKey="day"
          tickFormatter={(value) => {
            const label = lang === "ar" ? "اليوم" : "Day"
            return formatUnitTick(lang, label, value, { maximumFractionDigits: 0 })
          }}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <YAxis
          tickFormatter={(value) => {
            if (lang === "ar") {
              const formatted = formatNumberForLang(lang, value / 1000, { maximumFractionDigits: 0 })
              return wrapForLang(lang, `${formatted} آلاف`)
            }
            const formatted = formatNumberForLang(lang, value / 1000, { maximumFractionDigits: 0 })
            return wrapForLang(lang, `${formatted}k`)
          }}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
          {surgeMarkers.map((marker) => (
            <ReferenceLine
              key={marker.day}
              x={marker.day}
              stroke="hsl(45, 93%, 55%)"
              strokeDasharray="3 3"
              label={{
                value: wrapForLang(lang, marker.label),
                position: "insideTopLeft",
                fontSize: 10,
                fill: "hsl(38, 92%, 45%)",
              }}
            />
          ))}
          <Line type="monotone" dataKey="predicted" stroke="var(--color-predicted)" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" strokeWidth={2} dot={{ r: 3 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
        </LineChart>
      </ChartContainer>
      <p className="text-xs text-muted-foreground">
        {lang === "ar"
          ? "يتسع الفارق (MAPE) من 7٪ إلى 15٪ مع اعتماد أكبر على تسعير الازدحام."
          : "Gap widens as reliance grows: MAPE rises from 7% to 15% under heavier surge reliance."}
      </p>
    </div>
  )
}

function ConcentrationEngagementChart({ lang }: { lang: Locale }) {
  const data = [
    { week: 1, share: 55, ctr: 2.6 },
    { week: 2, share: 57, ctr: 2.5 },
    { week: 3, share: 60, ctr: 2.4 },
    { week: 4, share: 63, ctr: 2.3 },
    { week: 5, share: 66, ctr: 2.25 },
    { week: 6, share: 68, ctr: 2.2 },
    { week: 7, share: 62, ctr: 2.3 },
    { week: 8, share: 58, ctr: 2.4 },
  ]

  const config = {
    share: {
      label: lang === "ar" ? "نصيب أفضل 50" : "Top-50 share",
      color: "hsl(271, 81%, 60%)",
    },
    ctr: {
      label: lang === "ar" ? "CTR" : "CTR",
      color: "hsl(160, 84%, 40%)",
    },
  }

  return (
    <ChartContainer config={config}>
      <ComposedChart data={data} margin={{ left: -4, right: 12, top: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 16%, 82%)" />
        <XAxis
          dataKey="week"
          tickFormatter={(value) => {
            const label = lang === "ar" ? "أسبوع" : "Week"
            return formatUnitTick(lang, label, value, { maximumFractionDigits: 0 })
          }}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <YAxis
          yAxisId="left"
          domain={[40, 75]}
          tickFormatter={(value) => formatPercent(lang, value)}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[2, 2.8]}
          tickFormatter={(value) => formatPercent(lang, value, 1)}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <ReferenceLine
          x={6}
          stroke="hsl(45, 93%, 55%)"
          strokeDasharray="3 3"
          label={{
            value: wrapForLang(lang, lang === "ar" ? "أضيف الاستكشاف" : "Exploration introduced"),
            position: "insideTopLeft",
            fontSize: 10,
            fill: "hsl(38, 92%, 45%)",
          }}
        />
        <Bar yAxisId="left" dataKey="share" fill="var(--color-share)" radius={[4, 4, 0, 0]} />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="ctr"
          stroke="var(--color-ctr)"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value: number | string, name) => {
                const numericValue = Number(value)
                if (name === "ctr") {
                  return formatPercent(lang, numericValue, 1)
                }
                return formatPercent(lang, numericValue, 0)
              }}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
      </ComposedChart>
    </ChartContainer>
  )
}

function CreditStrategyShiftChart({ lang }: { lang: Locale }) {
  const aucData = [
    { month: 1, value: 0.84 },
    { month: 2, value: 0.83 },
    { month: 3, value: 0.82 },
    { month: 4, value: 0.8 },
    { month: 5, value: 0.79 },
    { month: 6, value: 0.78 },
    { month: 7, value: 0.78 },
    { month: 8, value: 0.79 },
    { month: 9, value: 0.8 },
    { month: 10, value: 0.81 },
    { month: 11, value: 0.82 },
    { month: 12, value: 0.82 },
  ]

  const defaultData = [
    { month: 1, value: 3.1 },
    { month: 2, value: 2.9 },
    { month: 3, value: 2.8 },
    { month: 4, value: 2.6 },
    { month: 5, value: 2.7 },
    { month: 6, value: 2.8 },
    { month: 7, value: 3.0 },
    { month: 8, value: 2.9 },
    { month: 9, value: 2.8 },
    { month: 10, value: 2.75 },
    { month: 11, value: 2.7 },
    { month: 12, value: 2.7 },
  ]

  const markerLabels = {
    policy: lang === "ar" ? "تم تفعيل السياسة" : "Policy introduced",
    audit: lang === "ar" ? "إضافة شريحة تدقيق" : "Audit band",
  }

  const renderLine = (
    data: { month: number; value: number }[],
    formatValue: (value: number) => string,
    color: string
  ) => (
    <ChartContainer
      config={{
        metric: {
          label: "",
          color,
        },
      }}
    >
      <LineChart data={data} margin={{ left: -4, right: 12, top: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 16%, 82%)" />
        <XAxis
          dataKey="month"
          tickFormatter={(value) => formatUnitTick(lang, lang === "ar" ? "شهر" : "Month", value, {
            maximumFractionDigits: 0,
          })}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <YAxis
          tickFormatter={(value) => wrapForLang(lang, formatValue(Number(value)))}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <ReferenceLine
          x={3}
          stroke="hsl(0, 84%, 60%)"
          strokeDasharray="3 3"
          label={{
            value: wrapForLang(lang, markerLabels.policy),
            position: "insideTopLeft",
            fontSize: 10,
            fill: "hsl(0, 70%, 45%)",
          }}
        />
        <ReferenceLine
          x={7}
          stroke="hsl(160, 84%, 40%)"
          strokeDasharray="3 3"
          label={{
            value: wrapForLang(lang, markerLabels.audit),
            position: "insideTopLeft",
            fontSize: 10,
            fill: "hsl(160, 70%, 35%)",
          }}
        />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={{ r: 3 }} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value: number | string) => wrapForLang(lang, formatValue(Number(value)))}
              labelFormatter={(value) =>
                formatUnitTick(lang, lang === "ar" ? "شهر" : "Month", Number(value), {
                  maximumFractionDigits: 0,
                })
              }
            />
          }
        />
      </LineChart>
    </ChartContainer>
  )

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {lang === "ar" ? "AUC" : "AUC"}
        </p>
        {renderLine(
          aucData,
          (value) => formatNumberForLang(lang, value, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          "hsl(222, 89%, 55%)"
        )}
      </div>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {lang === "ar" ? "معدل التخلف (%)" : "Default rate (%)"}
        </p>
        {renderLine(defaultData, (value) => formatPercent(lang, value, 1), "hsl(12, 89%, 62%)")}
      </div>
    </div>
  )
}

function FindingRStarChart({ lang }: { lang: Locale }) {
  const data = [
    { reliance: 0, exp5: 18, exp10: 17, exp20: 16, exp30: 15 },
    { reliance: 20, exp5: 12, exp10: 11, exp20: 11, exp30: 10 },
    { reliance: 40, exp5: 9.2, exp10: 8.8, exp20: 8.4, exp30: 8.1 },
    { reliance: 50, exp5: 8.9, exp10: 8.5, exp20: 8.1, exp30: 7.8 },
    { reliance: 60, exp5: 9.6, exp10: 9.1, exp20: 8.6, exp30: 8.2 },
    { reliance: 80, exp5: 12, exp10: 11, exp20: 10, exp30: 9.2 },
    { reliance: 100, exp5: 15, exp10: 13, exp20: 11.5, exp30: 10.5 },
  ]

  const minima = [
    { reliance: 48, error: 8.9, key: "exp5" },
    { reliance: 52, error: 8.5, key: "exp10" },
    { reliance: 58, error: 8.2, key: "exp20" },
    { reliance: 63, error: 7.9, key: "exp30" },
  ]

  const config = {
    exp5: {
      label: lang === "ar" ? "استكشاف 5٪" : "5% exploration",
      color: "hsl(210, 92%, 54%)",
    },
    exp10: {
      label: lang === "ar" ? "استكشاف 10٪" : "10% exploration",
      color: "hsl(340, 82%, 60%)",
    },
    exp20: {
      label: lang === "ar" ? "استكشاف 20٪" : "20% exploration",
      color: "hsl(158, 78%, 42%)",
    },
    exp30: {
      label: lang === "ar" ? "استكشاف 30٪" : "30% exploration",
      color: "hsl(271, 81%, 60%)",
    },
  }

  return (
    <ChartContainer config={config}>
      <ComposedChart data={data} margin={{ left: -4, right: 12, top: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 16%, 82%)" />
        <XAxis
          dataKey="reliance"
          tickFormatter={(value) => `${value}%`}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <YAxis
          tickFormatter={(value) => `${value.toFixed(1)}`}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <Line type="monotone" dataKey="exp5" stroke="var(--color-exp5)" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="exp10" stroke="var(--color-exp10)" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="exp20" stroke="var(--color-exp20)" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="exp30" stroke="var(--color-exp30)" strokeWidth={2} dot={false} />
        <Scatter data={minima} dataKey="error" name="R*" fill="hsl(45, 93%, 55%)" legendType="none" />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value: number | string, name, payload) => {
                if (payload && (payload as any).payload?.key) {
                  const label = (payload as any).payload?.key
                  const percent = label.replace("exp", "")
                  const formattedError = Number(value).toFixed(1)
                  return `${formattedError} @ ${percent}%`
                }
                return Number(value).toFixed(1)
              }}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
      </ComposedChart>
    </ChartContainer>
  )
}

function ExplorationTradeoffChart({ lang }: { lang: Locale }) {
  const data = [
    {
      metric: lang === "ar" ? "CTR قصير الأجل" : "Short-term CTR",
      no: 2.8,
      explore: 2.6,
    },
    {
      metric: lang === "ar" ? "دقة 8 أسابيع" : "8-week accuracy",
      no: 74,
      explore: 81,
    },
  ]

  const config = {
    no: {
      label: lang === "ar" ? "بدون استكشاف" : "No exploration",
      color: "hsl(12, 89%, 62%)",
    },
    explore: {
      label: lang === "ar" ? "استكشاف 15٪" : "15% exploration",
      color: "hsl(158, 78%, 42%)",
    },
  }

  return (
    <ChartContainer config={config}>
      <BarChart data={data} margin={{ left: -4, right: 12, top: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 16%, 82%)" vertical={false} />
        <XAxis dataKey="metric" tick={{ fontSize: 10 }} stroke="hsl(215, 16%, 52%)" />
        <YAxis
          domain={[0, 100]}
          tickFormatter={(value) => formatPercent(lang, value)}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <Bar dataKey="no" fill="var(--color-no)" radius={[4, 4, 0, 0]} barSize={22} />
        <Bar dataKey="explore" fill="var(--color-explore)" radius={[4, 4, 0, 0]} barSize={22} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value: number | string) => formatPercent(lang, Number(value), 1)}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  )
}

function RelianceBucketsChart({ lang }: { lang: Locale }) {
  const points = [
    { reliance: 20, error: 11 },
    { reliance: 40, error: 9 },
    { reliance: 60, error: 11.2 },
    { reliance: 80, error: 14 },
  ]

  const curve = [
    { reliance: 20, error: 10.8 },
    { reliance: 30, error: 9.8 },
    { reliance: 40, error: 9.0 },
    { reliance: 50, error: 8.9 },
    { reliance: 60, error: 10.0 },
    { reliance: 70, error: 12.2 },
    { reliance: 80, error: 14.0 },
  ]

  const config = {
    curve: {
      label: lang === "ar" ? "ملاءمة تربيعية" : "Quadratic fit",
      color: "hsl(216, 91%, 60%)",
    },
    bucket: {
      label: lang === "ar" ? "دلو الاعتماد" : "Reliance bucket",
      color: "hsl(12, 89%, 62%)",
    },
  }

  return (
    <ChartContainer config={config}>
      <ComposedChart data={curve} margin={{ left: -4, right: 12, top: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 16%, 82%)" />
        <XAxis
          dataKey="reliance"
          type="number"
          tickFormatter={(value) => formatPercent(lang, value)}
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
          domain={[20, 80]}
        />
        <YAxis
          domain={[8, 15]}
          tickFormatter={(value) =>
            wrapForLang(
              lang,
              formatNumberForLang(lang, value, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
            )
          }
          stroke="hsl(215, 16%, 52%)"
          tick={{ fontSize: 10 }}
        />
        <ReferenceLine
          y={9.5}
          stroke="hsl(160, 84%, 40%)"
          strokeDasharray="4 4"
          label={{
            value: wrapForLang(lang, lang === "ar" ? "RMSE نموذج الظل" : "Shadow RMSE"),
            position: "insideTopLeft",
            fontSize: 10,
            fill: "hsl(160, 70%, 35%)",
          }}
        />
        <Line type="monotone" dataKey="error" stroke="var(--color-curve)" strokeWidth={2} dot={false} />
        <Scatter data={points} dataKey="error" fill="var(--color-bucket)" />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value: number | string, _name, payload) => {
                const numeric = Number(value)
                if (payload && (payload as any).payload?.key) {
                  const key = (payload as any).payload?.key as string
                  const explorationPercent = Number(key.replace("exp", ""))
                  const formattedError = formatNumberForLang(lang, numeric, {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })
                  const percentText = `${formatNumberForLang(lang, explorationPercent, {
                    maximumFractionDigits: 0,
                  })}${percentSymbol[lang]}`
                  return wrapForLang(
                    lang,
                    `${formattedError} @ ${percentText}`
                  )
                }
                return wrapForLang(
                  lang,
                  formatNumberForLang(lang, numeric, {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })
                )
              }}
              labelFormatter={(value: number) =>
                wrapForLang(
                  lang,
                  `${lang === "ar" ? "اعتماد" : "Reliance"} ${formatNumberForLang(lang, value, {
                    maximumFractionDigits: 0,
                  })}${percentSymbol[lang]}`
                )
              }
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
      </ComposedChart>
    </ChartContainer>
  )
}

function FeedbackCycleDiagram({ lang }: { lang: Locale }) {
  const labels = {
    predict: lang === "ar" ? wrapForLang(lang, "تنبأ") : "Predict",
    act: lang === "ar" ? wrapForLang(lang, "تصرف") : "Act",
    react: lang === "ar" ? wrapForLang(lang, "تفاعل") : "React",
    update: lang === "ar" ? wrapForLang(lang, "حدّث") : "Update",
    world: lang === "ar" ? wrapForLang(lang, "العالم") : "World",
    title: lang === "ar" ? wrapForLang(lang, "دورة التغذية الراجعة") : "Feedback cycle",
  }

  const textDirectionProps =
    lang === "ar"
      ? { direction: "rtl" as const, unicodeBidi: "plaintext" as const }
      : { direction: "ltr" as const }

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xs font-medium uppercase tracking-tight text-muted-foreground">
        {labels.title}
      </span>
      <svg viewBox="0 0 260 260" className="h-56 w-56">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="6"
            markerHeight="6"
            refX="4"
            refY="3"
            orient="auto"
            fill="currentColor"
          >
            <path d="M0,0 L6,3 L0,6 z" />
          </marker>
        </defs>
        <circle cx="130" cy="130" r="88" fill="none" stroke="hsl(215, 16%, 75%)" strokeDasharray="6 6" />
        <path
          d="M130 34 A96 96 0 0 1 226 130"
          fill="none"
          stroke="hsl(215, 16%, 45%)"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
        <path
          d="M226 130 A96 96 0 0 1 130 226"
          fill="none"
          stroke="hsl(215, 16%, 45%)"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
        <path
          d="M130 226 A96 96 0 0 1 34 130"
          fill="none"
          stroke="hsl(215, 16%, 45%)"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
        <path
          d="M34 130 A96 96 0 0 1 130 34"
          fill="none"
          stroke="hsl(215, 16%, 45%)"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
        <circle cx="130" cy="130" r="36" fill="hsl(217, 91%, 60%, 0.08)" stroke="hsl(217, 91%, 60%)" />
        <text
          x="130"
          y="132"
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          fill="hsl(219, 43%, 26%)"
          {...textDirectionProps}
        >
          {labels.world}
        </text>
        <text
          x="130"
          y="22"
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          fill="hsl(215, 16%, 35%)"
          {...textDirectionProps}
        >
          {labels.predict}
        </text>
        <text
          x="238"
          y="134"
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          fill="hsl(215, 16%, 35%)"
          {...textDirectionProps}
        >
          {labels.act}
        </text>
        <text
          x="130"
          y="244"
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          fill="hsl(215, 16%, 35%)"
          {...textDirectionProps}
        >
          {labels.react}
        </text>
        <text
          x="22"
          y="134"
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          fill="hsl(215, 16%, 35%)"
          {...textDirectionProps}
        >
          {labels.update}
        </text>
      </svg>
    </div>
  )
}

function DistributionShiftChart({ lang }: { lang: Locale }) {
  const beforeData = [
    { bucket: "A", value: 28 },
    { bucket: "B", value: 22 },
    { bucket: "C", value: 34 },
    { bucket: "D", value: 16 },
  ]
  const afterData = [
    { bucket: "A", value: 18 },
    { bucket: "B", value: 34 },
    { bucket: "C", value: 26 },
    { bucket: "D", value: 22 },
  ]

  const config = {
    value: {
      label: lang === "ar" ? "النسبة" : "Share",
      color: "hsl(226, 70%, 55%)",
    },
  }

  const panelTitleBefore = lang === "ar" ? "قبل النشر" : "Before deployment"
  const panelTitleAfter = lang === "ar" ? "بعد القرارات" : "After policy decisions"
  const note =
    lang === "ar"
      ? "ملاحظة: أفعال النموذج غيّرت البيانات التي سيتعلم منها لاحقاً."
      : "Note: The model’s own actions changed what data it will learn from next."

  return (
    <div className="space-y-3">
      <div className="grid gap-4 sm:grid-cols-2">
        {[{ title: panelTitleBefore, data: beforeData }, { title: panelTitleAfter, data: afterData }].map(
          ({ title, data }, idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
              <ChartContainer config={config} className="h-48">
                <BarChart data={data} margin={{ left: -6, right: 12, top: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 16%, 82%)" vertical={false} />
                  <XAxis dataKey="bucket" tick={{ fontSize: 10 }} stroke="hsl(215, 16%, 52%)" />
                  <YAxis
                    domain={[0, 40]}
                    tick={{ fontSize: 10 }}
                    stroke="hsl(215, 16%, 52%)"
                    tickFormatter={(value) => formatPercent(lang, value, 0)}
                  />
                  <Bar dataKey="value" fill="var(--color-value)" radius={[6, 6, 0, 0]} barSize={32} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value: number | string) => formatPercent(lang, Number(value), 1)}
                      />
                    }
                  />
                </BarChart>
              </ChartContainer>
            </div>
          )
        )}
      </div>
      <p className="text-[11px] leading-relaxed text-muted-foreground">{note}</p>
    </div>
  )
}

function PolicyDistributionChangeChart({ lang }: { lang: Locale }) {
  const data = [
    { shift: -3, before: 0.05, after: 0.04 },
    { shift: -2, before: 0.12, after: 0.09 },
    { shift: -1, before: 0.18, after: 0.16 },
    { shift: 0, before: 0.22, after: 0.25 },
    { shift: 1, before: 0.18, after: 0.21 },
    { shift: 2, before: 0.12, after: 0.16 },
    { shift: 3, before: 0.07, after: 0.09 },
  ]

  const config = {
    before: {
      label: lang === "ar" ? "قبل السياسة" : "Before policy",
      color: "hsl(217, 91%, 60%)",
    },
    after: {
      label: lang === "ar" ? "بعد السياسة" : "After policy",
      color: "hsl(13, 83%, 58%)",
    },
  }

  const caption =
    lang === "ar"
      ? "لوحظ تغير في الأطراف: زادت القيم العالية بينما انخفضت القيم المتطرفة المنخفضة."
      : "The tails shifted: high outcomes increased while low extremes thinned."

  return (
    <div className="space-y-3">
      <ChartContainer config={config} className="h-52">
        <ComposedChart data={data} margin={{ left: -12, right: 12, top: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 16%, 82%)" />
          <XAxis
            dataKey="shift"
            tickFormatter={(value) => wrapForLang(lang, value.toString())}
            stroke="hsl(215, 16%, 52%)"
            tick={{ fontSize: 10 }}
          />
          <YAxis
            tickFormatter={(value) => formatPercent(lang, value * 100, 0)}
            stroke="hsl(215, 16%, 52%)"
            tick={{ fontSize: 10 }}
          />
          <Area
            type="monotone"
            dataKey="before"
            stroke="var(--color-before)"
            fill="var(--color-before)"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="after"
            stroke="var(--color-after)"
            fill="var(--color-after)"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <ReferenceLine
            x={0}
            stroke="hsl(215, 16%, 52%)"
            strokeDasharray="4 4"
            label={{
              value: lang === "ar" ? "المتوسط" : "Mean",
              position: "insideTopRight",
              fontSize: 10,
              fill: "hsl(215, 16%, 45%)",
            }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value: number | string, name) =>
                  `${name === "before" ? (lang === "ar" ? "قبل" : "Before") : lang === "ar" ? "بعد" : "After"}: ${formatPercent(
                    lang,
                    Number(value) * 100,
                    1
                  )}`
                }
                labelFormatter={(value) =>
                  wrapForLang(lang, `${lang === "ar" ? "الإزاحة" : "Shift"} ${value}`)
                }
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
        </ComposedChart>
      </ChartContainer>
      <p className="text-[11px] leading-relaxed text-muted-foreground">{caption}</p>
    </div>
  )
}

function AdoptionGuardrailSeries({ lang }: { lang: Locale }) {
  const data = [
    { week: 1, adoption: 0.12, wait: 11.4 },
    { week: 2, adoption: 0.18, wait: 11.1 },
    { week: 3, adoption: 0.24, wait: 10.9 },
    { week: 4, adoption: 0.32, wait: 10.5, guardrail: true },
    { week: 5, adoption: 0.42, wait: 10.1, guardrail: true },
    { week: 6, adoption: 0.51, wait: 9.8, guardrail: true },
    { week: 7, adoption: 0.62, wait: 9.6 },
    { week: 8, adoption: 0.7, wait: 9.4 },
    { week: 9, adoption: 0.78, wait: 9.2, guardrail: true },
    { week: 10, adoption: 0.84, wait: 9.0, guardrail: true },
    { week: 11, adoption: 0.88, wait: 9.1 },
    { week: 12, adoption: 0.9, wait: 9.0 },
  ]

  const adoptionLabel = lang === "ar" ? "معدل التبنّي" : "Policy adoption"
  const waitLabel = lang === "ar" ? "متوسط زمن الانتظار" : "Average wait"
  const shadedLabel = lang === "ar" ? "فترة الحواجز" : "Guardrail period"

  const config = {
    adoption: {
      label: adoptionLabel,
      color: "hsl(221, 83%, 53%)",
    },
    wait: {
      label: waitLabel,
      color: "hsl(12, 89%, 62%)",
    },
  }

  const guardrailRanges = [
    { start: 4, end: 6 },
    { start: 9, end: 10 },
  ]

  return (
    <ChartContainer config={config} className="h-56">
      <ComposedChart data={data} margin={{ left: -4, right: 12, top: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 16%, 82%)" />
        <XAxis
          dataKey="week"
          tick={{ fontSize: 10 }}
          stroke="hsl(215, 16%, 52%)"
          tickFormatter={(value) => wrapForLang(lang, `${lang === "ar" ? "الأسبوع" : "Week"} ${value}`)}
        />
        <YAxis
          yAxisId="left"
          orientation="left"
          tick={{ fontSize: 10 }}
          stroke="hsl(221, 60%, 50%)"
          tickFormatter={(value) => formatPercent(lang, value * 100, 0)}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 10 }}
          stroke="hsl(12, 70%, 45%)"
          tickFormatter={(value) =>
            wrapForLang(
              lang,
              lang === "ar"
                ? `${formatNumberForLang(lang, value, { maximumFractionDigits: 1 })} دقيقة`
                : `${formatNumberForLang(lang, value, { maximumFractionDigits: 1 })}m`
            )
          }
        />
        {guardrailRanges.map((range, idx) => (
          <ReferenceArea
            key={idx}
            x1={range.start}
            x2={range.end}
            y1={0}
            y2={14}
            fill="hsl(216, 81%, 85%)"
            fillOpacity={0.3}
            strokeOpacity={0}
            label={{
              value: wrapForLang(lang, shadedLabel),
              position: "insideTop",
              fontSize: 10,
              fill: "hsl(216, 55%, 35%)",
            }}
          />
        ))}
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="adoption"
          stroke="var(--color-adoption)"
          strokeWidth={2.5}
          dot={{ r: 2.5 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="wait"
          stroke="var(--color-wait)"
          strokeWidth={2.5}
          dot={{ r: 2.5 }}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value: number | string, name: string) => {
                if (name === "adoption") {
                  return formatPercent(lang, Number(value) * 100, 1)
                }
                return wrapForLang(
                  lang,
                  `${formatNumberForLang(lang, Number(value), { maximumFractionDigits: 1 })} ${
                    lang === "ar" ? "دقائق" : "min"
                  }`
                )
              }}
            />
          }
          labelFormatter={(value: number) =>
            wrapForLang(lang, `${lang === "ar" ? "الأسبوع" : "Week"} ${value}`)
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
      </ComposedChart>
    </ChartContainer>
  )
}
