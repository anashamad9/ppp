'use client'

import { useLayoutEffect, useRef, useState } from 'react'

import { motion } from 'motion/react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  AiBrain02Icon,
  AiBrain03Icon,
  AiCloud01Icon,
  AiContentGenerator01Icon,
  AiMagicIcon,
  AiSearchIcon,
  AiVoiceIcon,
  ChartBarLineIcon,
  CleaningBucketIcon,
  CodeIcon,
  ContentWritingIcon,
  CustomerSupportIcon,
  DataRecoveryIcon,
  DatabaseIcon,
  Image01Icon,
  Mail01Icon,
  PipelineIcon,
  Robot01Icon,
  SmartPhone01Icon,
  Task01Icon,
  UserGroupIcon,
  WorkflowCircle04Icon
} from '@hugeicons/core-free-icons'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type Language = 'en' | 'ar'

const tabs = [
  {
    name: {
      en: 'ML Models',
      ar: 'نماذج تعلم الآلة'
    },
    value: 'ml-models',
    services: [
      { key: 'prediction-models', label: { en: 'Prediction Models', ar: 'نماذج التنبؤ' }, icon: ChartBarLineIcon },
      { key: 'image-detection', label: { en: 'Image Detection', ar: 'كشف الصور' }, icon: Image01Icon },
      { key: 'customer-behavior', label: { en: 'Customer Behavior', ar: 'سلوك العملاء' }, icon: UserGroupIcon },
      { key: 'demand-forecasting', label: { en: 'Demand Forecasting', ar: 'توقع الطلب' }, icon: AiSearchIcon },
      { key: 'anomaly-detection', label: { en: 'Anomaly Detection', ar: 'كشف الشذوذ' }, icon: AiMagicIcon },
      { key: 'recommendation-systems', label: { en: 'Recommendation Systems', ar: 'أنظمة التوصية' }, icon: AiBrain03Icon }
    ]
  },
  {
    name: {
      en: 'AI Agents',
      ar: 'وكلاء AI'
    },
    value: 'ai-agents',
    services: [
      { key: 'support-agents', label: { en: 'Support Agents', ar: 'وكلاء الدعم' }, icon: CustomerSupportIcon },
      { key: 'sales-assistants', label: { en: 'Sales Assistants', ar: 'مساعدو المبيعات' }, icon: SmartPhone01Icon },
      { key: 'workflow-agents', label: { en: 'Workflow Agents', ar: 'وكلاء سير العمل' }, icon: WorkflowCircle04Icon },
      { key: 'research-agents', label: { en: 'Research Agents', ar: 'وكلاء البحث' }, icon: AiSearchIcon },
      { key: 'ops-copilots', label: { en: 'Ops Copilots', ar: 'مساعدو العمليات' }, icon: Robot01Icon },
      { key: 'knowledge-agents', label: { en: 'Knowledge Agents', ar: 'وكلاء المعرفة' }, icon: AiBrain02Icon }
    ]
  },
  {
    name: {
      en: 'LLMs',
      ar: 'النماذج اللغوية الكبيرة'
    },
    value: 'llms',
    services: [
      { key: 'fine-tuning', label: { en: 'Fine-Tuning', ar: 'الضبط الدقيق' }, icon: AiBrain02Icon },
      { key: 'rag-systems', label: { en: 'RAG Systems', ar: 'أنظمة RAG' }, icon: DatabaseIcon },
      { key: 'prompt-engineering', label: { en: 'Prompt Engineering', ar: 'هندسة المطالبات' }, icon: CodeIcon },
      { key: 'private-llm-deployment', label: { en: 'Private LLM Deployment', ar: 'نشر نماذج خاصة' }, icon: AiCloud01Icon },
      { key: 'evaluation-pipelines', label: { en: 'Evaluation Pipelines', ar: 'خطوط التقييم' }, icon: PipelineIcon },
      { key: 'guardrails-safety', label: { en: 'Guardrails & Safety', ar: 'ضوابط الأمان' }, icon: Task01Icon }
    ]
  },
  {
    name: {
      en: 'Data',
      ar: 'البيانات'
    },
    value: 'data',
    services: [
      { key: 'data-pipelines', label: { en: 'Data Pipelines', ar: 'خطوط البيانات' }, icon: PipelineIcon },
      { key: 'data-cleaning', label: { en: 'Data Cleaning', ar: 'تنظيف البيانات' }, icon: CleaningBucketIcon },
      { key: 'feature-engineering', label: { en: 'Feature Engineering', ar: 'هندسة السمات' }, icon: AiMagicIcon },
      { key: 'etl-orchestration', label: { en: 'ETL Orchestration', ar: 'تنسيق ETL' }, icon: WorkflowCircle04Icon },
      { key: 'data-warehousing', label: { en: 'Data Warehousing', ar: 'مستودعات البيانات' }, icon: DatabaseIcon },
      { key: 'data-recovery', label: { en: 'Data Recovery', ar: 'استعادة البيانات' }, icon: DataRecoveryIcon }
    ]
  },
  {
    name: {
      en: 'Automation',
      ar: 'الأتمتة'
    },
    value: 'automation',
    services: [
      { key: 'task-automation', label: { en: 'Task Automation', ar: 'أتمتة المهام' }, icon: Task01Icon },
      { key: 'crm-automation', label: { en: 'CRM Automation', ar: 'أتمتة إدارة العملاء' }, icon: UserGroupIcon },
      { key: 'email-workflows', label: { en: 'Email Workflows', ar: 'سير عمل البريد' }, icon: Mail01Icon },
      { key: 'back-office-ops', label: { en: 'Back-Office Ops', ar: 'عمليات المكاتب الخلفية' }, icon: WorkflowCircle04Icon },
      { key: 'process-monitoring', label: { en: 'Process Monitoring', ar: 'مراقبة العمليات' }, icon: ChartBarLineIcon },
      { key: 'approval-flows', label: { en: 'Approval Flows', ar: 'مسارات الموافقة' }, icon: PipelineIcon }
    ]
  },
  {
    name: {
      en: 'Generative AI',
      ar: 'AI توليدي'
    },
    value: 'generative-ai',
    services: [
      { key: 'content-generation', label: { en: 'Content Generation', ar: 'توليد المحتوى' }, icon: AiContentGenerator01Icon },
      { key: 'image-generation', label: { en: 'Image Generation', ar: 'توليد الصور' }, icon: Image01Icon },
      { key: 'voice-generation', label: { en: 'Voice Generation', ar: 'توليد الصوت' }, icon: AiVoiceIcon },
      { key: 'creative-copilots', label: { en: 'Creative Copilots', ar: 'مساعدو الإبداع' }, icon: ContentWritingIcon },
      { key: 'brand-assets', label: { en: 'Brand Assets', ar: 'أصول العلامة' }, icon: AiMagicIcon },
      { key: 'marketing-creatives', label: { en: 'Marketing Creatives', ar: 'مواد تسويقية إبداعية' }, icon: CodeIcon }
    ]
  }
]

const AnimatedUnderlineTabsDemo = ({ language = 'en' }: { language?: Language }) => {
  const isArabic = language === 'ar'
  const [activeTab, setActiveTab] = useState('ml-models')
  const tabsListRef = useRef<HTMLDivElement | null>(null)
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    const activeIndex = tabs.findIndex(tab => tab.value === activeTab)
    const activeLabelElement = labelRefs.current[activeIndex]
    const tabsListElement = tabsListRef.current

    const updateUnderline = () => {
      if (!activeLabelElement || !tabsListElement) {
        return
      }

      const labelRect = activeLabelElement.getBoundingClientRect()
      const listRect = tabsListElement.getBoundingClientRect()

      setUnderlineStyle({
        left: labelRect.left - listRect.left,
        width: labelRect.width
      })
    }

    updateUnderline()
    window.addEventListener('resize', updateUnderline)

    return () => {
      window.removeEventListener('resize', updateUnderline)
    }
  }, [activeTab, language])

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className='w-full'>
      <Tabs dir={isArabic ? 'rtl' : 'ltr'} value={activeTab} onValueChange={setActiveTab} className='gap-4'>
        <TabsList
          variant='line'
          ref={tabsListRef}
          className='relative w-full rounded-none border-b border-zinc-200/70 bg-transparent p-0'
        >
          {tabs.map((tab, index) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`text-base leading-6 font-light text-foreground/70 data-[state=active]:text-black relative z-10 rounded-none border-0 bg-transparent shadow-none after:hidden data-[state=active]:shadow-none ${
                isArabic ? 'justify-start text-right' : 'justify-start text-left'
              }`}
            >
              <span
                ref={el => {
                  labelRefs.current[index] = el
                }}
                className='inline-block'
              >
                {tab.name[language]}
              </span>
            </TabsTrigger>
          ))}

          <motion.div
            className='bg-primary absolute bottom-0 z-20 h-0.5'
            layoutId='underline'
            style={{
              left: underlineStyle.left,
              width: underlineStyle.width
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 40
            }}
          />
        </TabsList>

        {tabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value} dir={isArabic ? 'rtl' : 'ltr'}>
            <ul dir={isArabic ? 'rtl' : 'ltr'} className={`grid grid-cols-2 gap-x-6 gap-y-2 text-base leading-6 font-light ${isArabic ? 'text-right' : 'text-left'}`}>
              {tab.services.map(service => (
                <li key={service.key} className='flex items-center gap-2'>
                  <HugeiconsIcon icon={service.icon} size={16} strokeWidth={1.8} className='text-foreground/70 shrink-0' />
                  <span className='text-foreground/70'>{service.label[language]}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default AnimatedUnderlineTabsDemo
