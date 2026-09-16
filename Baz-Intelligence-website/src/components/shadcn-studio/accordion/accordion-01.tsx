import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

type Language = 'en' | 'ar'

const items = [
  {
    title: {
      en: 'What services does Atmet Technologies provide?',
      ar: 'ما الخدمات التي تقدمها أتمت تيكنولوجيس؟'
    },
    content: {
      en: 'We design and deploy custom AI systems across ML models, LLM solutions, AI agents, workflow automation, and data pipelines. Each engagement is tailored to your business processes, data, and operational goals.',
      ar: 'نقوم بتصميم ونشر أنظمة ذكاء اصطناعي مخصصة تشمل نماذج تعلم الآلة، وحلول النماذج اللغوية الكبيرة، ووكلاء الذكاء الاصطناعي، وأتمتة سير العمل، وخطوط البيانات. كل مشروع يُصمم وفق عملياتك وبياناتك وأهدافك التشغيلية.'
    }
  },
  {
    title: {
      en: 'How does a project engagement work?',
      ar: 'كيف تسير مراحل تنفيذ المشروع؟'
    },
    content: {
      en: 'We start with a short discovery phase to define use cases, available data, and success metrics. Then we move into architecture, implementation, testing, and deployment, with clear milestones and weekly progress updates.',
      ar: 'نبدأ بمرحلة استكشاف قصيرة لتحديد حالات الاستخدام والبيانات المتاحة ومقاييس النجاح. بعد ذلك ننتقل إلى التصميم المعماري والتنفيذ والاختبار والإطلاق، مع مراحل واضحة وتحديثات أسبوعية للتقدم.'
    }
  },
  {
    title: {
      en: 'Do you support deployment and ongoing optimization?',
      ar: 'هل تدعمون الإطلاق والتحسين المستمر بعد التنفيذ؟'
    },
    content: {
      en: 'Yes. We handle production deployment, performance tuning, monitoring, and iteration after launch. Our goal is long-term reliability, measurable ROI, and continuous model improvement as your business evolves.',
      ar: 'نعم. نحن ندير الإطلاق في بيئة الإنتاج، وضبط الأداء، والمراقبة، والتحسين المستمر بعد الإطلاق. هدفنا موثوقية طويلة المدى، وعائد استثمار قابل للقياس، وتطوير دائم للنماذج مع نمو أعمالك.'
    }
  }
]

const AccordionDemo = ({ language = 'en' }: { language?: Language }) => {
  return (
    <Accordion type='single' collapsible className='w-full' defaultValue='item-1'>
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionTrigger className='text-base leading-6 font-light text-black/65 hover:no-underline data-[state=open]:font-medium data-[state=open]:text-black'>
            {item.title[language]}
          </AccordionTrigger>
          <AccordionContent className='text-base leading-6 font-light text-black/65'>{item.content[language]}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default AccordionDemo
