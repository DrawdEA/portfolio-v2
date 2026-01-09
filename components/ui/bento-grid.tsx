"use client"

import { ComponentPropsWithoutRef, ReactNode } from "react"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className: string
  background: ReactNode
  Icon?: React.ElementType
  description: string
  href?: string
  cta: string
  buttonIcon?: React.ElementType
  centerButton?: boolean
  largeButton?: boolean
  whiteButton?: boolean
  onClick?: () => void
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  buttonIcon: ButtonIcon,
  centerButton = false,
  largeButton = false,
  whiteButton = false,
  onClick,
  ...props
}: BentoCardProps) => {
  const router = useRouter()
  const IconComponent = ButtonIcon || ArrowRightIcon
  
  const handleCardClick = (e: React.MouseEvent) => {
    // Only handle clicks on mobile (< 1024px)
    // On desktop, the hover button handles clicks
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      if (href) {
        e.preventDefault()
        e.stopPropagation()
        if (href.startsWith('#')) {
          // Handle anchor links
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        } else {
          router.push(href)
        }
      } else if (onClick) {
        e.preventDefault()
        e.stopPropagation()
        onClick()
      }
    }
  }

  return (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles
      "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "dark:bg-background transform-gpu dark:[box-shadow:0_-20px_80px_-20px_#0f192d1f_inset] dark:[border:1px_solid_rgba(15,25,45,.3)]",
      // Mobile: entire card clickable if href or onClick provided
      (href || onClick) && "cursor-pointer lg:cursor-default",
      className
    )}
    onClick={handleCardClick}
    {...props}
  >
    <div>{background}</div>
    <div className="p-4">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
        {Icon && (
          <Icon className="h-12 w-12 origin-left transform-gpu text-[#1e3a8a] transition-all duration-300 ease-in-out group-hover:scale-75" />
        )}
        <h3 className="text-xl font-semibold text-white">
          {name}
        </h3>
        <p className="max-w-lg text-neutral-400 truncate">{description}</p>
      </div>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex",
        centerButton && "justify-center"
      )}
    >
      {href ? (
        <Button
          variant="link"
          asChild
          size="sm"
          className={cn(
            "pointer-events-auto p-0 text-neutral-400",
            centerButton && "justify-center",
            whiteButton && "text-white"
          )}
        >
          <a href={href} className={cn(
            "text-sm transition-all duration-300 text-neutral-400 hover:text-neutral-300 font-normal group",
            centerButton && "flex items-center justify-center",
            whiteButton && "text-white"
          )}>
            {cta}
            <IconComponent className={cn(
              cta ? "ms-2" : "",
              largeButton ? "h-12 w-12" : "h-4 w-4",
              whiteButton ? "text-white" : "text-current",
              largeButton && "stroke-[3]",
              "rtl:rotate-180"
            )} />
          </a>
        </Button>
      ) : (
        <Button
          variant="link"
          size="sm"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onClick?.()
          }}
          className={cn(
            "pointer-events-auto p-0 text-neutral-400",
            centerButton && "justify-center",
            whiteButton && "text-white"
          )}
        >
          {cta}
              <IconComponent className={cn(
                cta ? "ms-2" : "",
                largeButton ? "h-12 w-12" : "h-4 w-4",
                whiteButton ? "text-white" : "text-current",
                largeButton && "stroke-[3]",
                "rtl:rotate-180"
              )} />
        </Button>
      )}
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
  )
}

export { BentoCard, BentoGrid }
