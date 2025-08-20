"use client"

import type React from "react"
import {
  X,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Trophy,
} from "lucide-react"
import type { Locale } from "@/i18n-config"

// ✅ Hugging Face logo (external SVG URL, consistent size with others)
const HuggingFaceIcon = () => (
  <img
    src="https://huggingface.co/datasets/huggingface/brand-assets/resolve/main/hf-logo-pirate.svg"
    alt="Hugging Face"
    className="h-5 w-5"
  />
)

export default function ContactModal({
  isOpen,
  onClose,
  lang,
}: {
  isOpen: boolean
  onClose: () => void
  lang: Locale
}) {
  if (!isOpen) return null

  const isArabic = lang === "ar"

  const text = {
    title: isArabic ? "تواصل معي" : "Get in touch",
    contactInfo: isArabic
      ? "يمكنك التواصل معي عبر هذه المعلومات"
      : "You can reach me through these channels",
    socialTitle: isArabic ? "روابطي على الشبكات" : "My Social Links",
    email: isArabic ? "البريد الإلكتروني" : "Email",
    phone: isArabic ? "الهاتف" : "Phone",
    location: isArabic ? "عمان، الأردن" : "Amman, Jordan",
  }

  const links = [
    { label: text.email, icon: <Mail className="h-5 w-5" />, href: "mailto:hi.anashamad@gmail.com" },
    { label: text.phone, icon: <Phone className="h-5 w-5" />, href: "tel:+962795874662" },
    { label: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/anas-hamad1909/" },
    { label: "X", icon: <Twitter className="h-5 w-5" />, href: "https://x.com/its_anas9" },
    { label: "GitHub", icon: <Github className="h-5 w-5" />, href: "https://github.com/anashamad9" },
    { label: "Hugging Face", icon: <HuggingFaceIcon />, href: "https://huggingface.co/anashamad" },
    { label: "Kaggle", icon: <Trophy className="h-5 w-5" />, href: "https://www.kaggle.com/anasbassam" },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-sm bg-background/95 backdrop-blur-xl shadow-2xl rounded-xl overflow-hidden ${
          isArabic ? "font-arabic" : ""
        }`}
        dir={isArabic ? "rtl" : "ltr"}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-3 ${
            isArabic ? "left-3" : "right-3"
          } p-1.5 rounded-full bg-white/80 backdrop-blur-md shadow-md hover:bg-white transition z-20`}
        >
          <X className="h-3 w-3 text-black" /> {/* smaller */}
        </button>

        {/* Header Image */}
        <div className="w-full h-32 relative">
          <img
            src="https://images.hdqwalls.com/wallpapers/night-sky-digital-art-4k-fc.jpg"
            alt="Night Sky Digital Art"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contact Info Section */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{text.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{text.contactInfo}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-5 w-5" />
              <span>hi.anashamad@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-5 w-5" />
              <span>+962795874662</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-5 w-5" />
              <span>{text.location}</span>
            </div>
          </div>

          {/* Social Media Section */}
          <h4 className="text-md font-medium mb-2">{text.socialTitle}</h4>
          <div className="flex flex-col gap-2">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg 
                           bg-neutral-100 dark:bg-neutral-800 
                           hover:bg-neutral-200 dark:hover:bg-neutral-700 
                           transition text-sm text-gray-800 dark:text-gray-200"
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
