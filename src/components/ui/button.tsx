import * as Headless from '@headlessui/react'
import React, { forwardRef } from 'react'
import { cn } from '~/lib/utils/cn'

import { type LinkProps } from './link'
import { Link } from './link'

const styles = {
  base: [
    // Base
    'relative isolate inline-flex items-center justify-center gap-x-2 rounded-xl border text-base/6',
    // Sizing - Mobile First
    'min-h-[36px] min-w-[36px] px-3 py-2 text-sm/6', // Smaller for mobile
    // Desktop Sizing
    'sm:min-h-[44px] sm:px-4 sm:py-2.5 sm:text-base/6', // Larger for desktop
    // Focus
    'focus:outline-hidden data-focus:outline data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500',
    // Disabled
    'data-disabled:opacity-50',
    // Icon sizing - Mobile First
    'data-[slot=icon]:*:-mx-0.5 data-[slot=icon]:*:my-0.5 data-[slot=icon]:*:size-4 data-[slot=icon]:*:shrink-0 data-[slot=icon]:*:text-(--btn-icon)',
    // Icon sizing - Desktop
    'sm:data-[slot=icon]:*:size-5 sm:data-[slot=icon]:*:my-0.5',
    // Icon colors
    'forced-colors:[--btn-icon:ButtonText] forced-colors:data-hover:[--btn-icon:ButtonText]',
  ],
  solid: [
    // Optical border, implemented as the button background to avoid corner artifacts
    'border-transparent bg-(--btn-border)',
    // Dark mode: border is rendered on `after` so background is set to button background
    'dark:bg-(--btn-bg)',
    // Button background, implemented as foreground layer to stack on top of pseudo-border layer
    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg)',
    // Drop shadow, applied to the inset `before` layer so it blends with the border
    'before:shadow-xs',
    // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
    'dark:before:hidden',
    // Dark mode: Subtle white outline is applied using a border
    'dark:border-white/5',
    // Shim/overlay, inset to match button foreground and used for hover state + highlight shadow
    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)]',
    // Inner highlight shadow
    'after:shadow-[shadow:inset_0_1px_--theme(--color-white/15%)]',
    // White overlay on hover
    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
    // Dark mode: `after` layer expands to cover entire button
    'dark:after:-inset-px dark:after:rounded-xl',
    // Disabled
    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
  ],
  outline: [
    // Base
    'border-zinc-950/10 text-zinc-950 data-active:bg-zinc-950/[2.5%] data-hover:bg-zinc-950/[2.5%]',
    // Dark mode
    'dark:border-white/15 dark:text-white dark:[--btn-bg:transparent] dark:data-active:bg-white/5 dark:data-hover:bg-white/5',
    // Icon
    '[--btn-icon:var(--color-zinc-500)] data-active:[--btn-icon:var(--color-zinc-700)] data-hover:[--btn-icon:var(--color-zinc-700)] dark:data-active:[--btn-icon:var(--color-zinc-400)] dark:data-hover:[--btn-icon:var(--color-zinc-400)]',
  ],
  plain: [
    // Base
    'border-transparent text-zinc-950 px-0 py-0 sm:px-0 sm:py-0',
    // Hover and active states
    'transition-colors duration-200',
    'hover:bg-zinc-950/5 active:bg-zinc-950/10',
    // Dark mode
    'dark:text-white dark:hover:bg-white/10 dark:active:bg-white/15',
    // Icon
    '[--btn-icon:var(--color-zinc-500)] data-active:[--btn-icon:var(--color-zinc-700)] data-hover:[--btn-icon:var(--color-zinc-700)] dark:[--btn-icon:var(--color-zinc-500)] dark:data-active:[--btn-icon:var(--color-zinc-400)] dark:data-hover:[--btn-icon:var(--color-zinc-400)]',
  ],
  colors: {
    'primary-outline': [
      // Light mode
      'text-(--primary-700) [--btn-bg:transparent] border-(--primary-200) data-hover:bg-(--primary-50) data-active:bg-(--primary-100)',
      // Dark mode
      'dark:text-(--primary-300) dark:[--btn-bg:transparent] dark:border-(--primary-800) dark:data-hover:bg-(--primary-950) dark:data-active:bg-(--primary-900)',
      // Icon colors
      '[--btn-icon:var(--primary-500)] data-active:[--btn-icon:var(--primary-600)] data-hover:[--btn-icon:var(--primary-600)] dark:[--btn-icon:var(--primary-400)] dark:data-active:[--btn-icon:var(--primary-300)] dark:data-hover:[--btn-icon:var(--primary-300)]',
    ],
    'secondary-outline': [
      // Light mode
      'text-(--secondary-700) [--btn-bg:transparent] border-(--secondary-200) data-hover:bg-(--secondary-50) data-active:bg-(--secondary-100)',
      // Dark mode
      'dark:text-(--secondary-300) dark:[--btn-bg:transparent] dark:border-(--secondary-800) dark:data-hover:bg-(--secondary-950) dark:data-active:bg-(--secondary-900)',
      // Icon colors
      '[--btn-icon:var(--secondary-500)] data-active:[--btn-icon:var(--secondary-600)] data-hover:[--btn-icon:var(--secondary-600)] dark:[--btn-icon:var(--secondary-400)] dark:data-active:[--btn-icon:var(--secondary-300)] dark:data-hover:[--btn-icon:var(--secondary-300)]',
    ],
    primary: [
      // Light mode - using softer violet background with darker text
      'text-(--primary-900) [--btn-bg:var(--primary-50)] [--btn-border:var(--primary-200)] [--btn-hover-overlay:var(--primary-100)]',
      // Dark mode - using lighter text for contrast
      'dark:text-(--primary-100) dark:[--btn-bg:var(--primary-900)] dark:[--btn-border:var(--primary-800)] dark:[--btn-hover-overlay:var(--primary-800)]',
      // Icon colors - adjusted for new violet palette
      '[--btn-icon:var(--primary-600)] data-active:[--btn-icon:var(--primary-700)] data-hover:[--btn-icon:var(--primary-700)] dark:[--btn-icon:var(--primary-300)] dark:data-active:[--btn-icon:var(--primary-200)] dark:data-hover:[--btn-icon:var(--primary-200)]',
    ],
    'primary-solid': [
      // Light mode - using primary-600 for good contrast with white text
      'text-white [--btn-bg:var(--primary-600)] [--btn-border:var(--primary-700)] [--btn-hover-overlay:var(--primary-500)]',
      // Dark mode - keeping consistent with light mode for brand recognition
      'dark:text-white dark:[--btn-bg:var(--primary-600)] dark:[--btn-border:var(--primary-700)] dark:[--btn-hover-overlay:var(--primary-500)]',
      // Icon colors - using lighter shades for contrast
      '[--btn-icon:var(--primary-100)] data-active:[--btn-icon:var(--primary-50)] data-hover:[--btn-icon:var(--primary-50)]',
    ],
    secondary: [
      // Light mode - using forest green
      'text-(--secondary-900) [--btn-bg:var(--secondary-50)] [--btn-border:var(--secondary-200)] [--btn-hover-overlay:var(--secondary-100)]',
      // Dark mode
      'dark:text-(--secondary-100) dark:[--btn-bg:var(--secondary-900)] dark:[--btn-border:var(--secondary-800)] dark:[--btn-hover-overlay:var(--secondary-800)]',
      // Icon colors
      '[--btn-icon:var(--secondary-600)] data-active:[--btn-icon:var(--secondary-700)] data-hover:[--btn-icon:var(--secondary-700)] dark:[--btn-icon:var(--secondary-300)] dark:data-active:[--btn-icon:var(--secondary-200)] dark:data-hover:[--btn-icon:var(--secondary-200)]',
    ],
    'destructive-outline': [
      // Base
      'border-red-200 text-red-700 data-active:bg-red-50 data-hover:bg-red-50',
      // Dark mode
      'dark:border-red-800 dark:text-red-400 dark:data-active:bg-red-950 dark:data-hover:bg-red-950',
      // Icon
      '[--btn-icon:var(--color-red-500)] data-active:[--btn-icon:var(--color-red-600)] data-hover:[--btn-icon:var(--color-red-600)] dark:[--btn-icon:var(--color-red-400)] dark:data-active:[--btn-icon:var(--color-red-300)] dark:data-hover:[--btn-icon:var(--color-red-300)]',
    ],
    'secondary-solid': [
      // Light mode
      'text-white [--btn-bg:var(--secondary-600)] [--btn-border:var(--secondary-700)] [--btn-hover-overlay:var(--secondary-500)]',
      // Dark mode
      'dark:text-white dark:[--btn-bg:var(--secondary-600)] dark:[--btn-border:var(--secondary-700)] dark:[--btn-hover-overlay:var(--secondary-500)]',
      // Icon colors
      '[--btn-icon:var(--secondary-100)] data-active:[--btn-icon:var(--secondary-50)] data-hover:[--btn-icon:var(--secondary-50)]',
    ],
    'dark/zinc': [
      'text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)]/90 [--btn-hover-overlay:var(--color-white)]/10',
      'dark:text-white dark:[--btn-bg:var(--color-zinc-600)] dark:[--btn-hover-overlay:var(--color-white)]/5',
      '[--btn-icon:var(--color-zinc-400)] data-active:[--btn-icon:var(--color-zinc-300)] data-hover:[--btn-icon:var(--color-zinc-300)]',
    ],
    light: [
      'text-zinc-950 [--btn-bg:white] [--btn-border:var(--color-zinc-950)]/10 [--btn-hover-overlay:var(--color-zinc-950)]/[2.5%] data-active:[--btn-border:var(--color-zinc-950)]/15 data-hover:[--btn-border:var(--color-zinc-950)]/15',
      'dark:text-white dark:[--btn-hover-overlay:var(--color-white)]/5 dark:[--btn-bg:var(--color-zinc-800)]',
      '[--btn-icon:var(--color-zinc-500)] data-active:[--btn-icon:var(--color-zinc-700)] data-hover:[--btn-icon:var(--color-zinc-700)] dark:[--btn-icon:var(--color-zinc-500)] dark:data-active:[--btn-icon:var(--color-zinc-400)] dark:data-hover:[--btn-icon:var(--color-zinc-400)]',
    ],
    'dark/white': [
      'text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)]/90 [--btn-hover-overlay:var(--color-white)]/10',
      'dark:text-zinc-950 dark:[--btn-bg:white] dark:[--btn-hover-overlay:var(--color-zinc-950)]/5',
      '[--btn-icon:var(--color-zinc-400)] data-active:[--btn-icon:var(--color-zinc-300)] data-hover:[--btn-icon:var(--color-zinc-300)] dark:[--btn-icon:var(--color-zinc-500)] dark:data-active:[--btn-icon:var(--color-zinc-400)] dark:data-hover:[--btn-icon:var(--color-zinc-400)]',
    ],
    dark: [
      'text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)]/90 [--btn-hover-overlay:var(--color-white)]/10',
      'dark:[--btn-hover-overlay:var(--color-white)]/5 dark:[--btn-bg:var(--color-zinc-800)]',
      '[--btn-icon:var(--color-zinc-400)] data-active:[--btn-icon:var(--color-zinc-300)] data-hover:[--btn-icon:var(--color-zinc-300)]',
    ],
    white: [
      'text-zinc-950 [--btn-bg:white] [--btn-border:var(--color-zinc-950)]/10 [--btn-hover-overlay:var(--color-zinc-950)]/[2.5%] data-active:[--btn-border:var(--color-zinc-950)]/15 data-hover:[--btn-border:var(--color-zinc-950)]/15',
      'dark:[--btn-hover-overlay:var(--color-zinc-950)]/5',
      '[--btn-icon:var(--color-zinc-400)] data-active:[--btn-icon:var(--color-zinc-500)] data-hover:[--btn-icon:var(--color-zinc-500)]',
    ],
    zinc: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-zinc-600)] [--btn-border:var(--color-zinc-700)]/90',
      'dark:[--btn-hover-overlay:var(--color-white)]/5',
      '[--btn-icon:var(--color-zinc-400)] data-active:[--btn-icon:var(--color-zinc-300)] data-hover:[--btn-icon:var(--color-zinc-300)]',
    ],
    indigo: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-indigo-500)] [--btn-border:var(--color-indigo-600)]/90',
      '[--btn-icon:var(--color-indigo-300)] data-active:[--btn-icon:var(--color-indigo-200)] data-hover:[--btn-icon:var(--color-indigo-200)]',
    ],
    cyan: [
      'text-cyan-950 [--btn-bg:var(--color-cyan-300)] [--btn-border:var(--color-cyan-400)]/80 [--btn-hover-overlay:var(--color-white)]/25',
      '[--btn-icon:var(--color-cyan-500)]',
    ],
    red: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-red-600)] [--btn-border:var(--color-red-700)]/90',
      '[--btn-icon:var(--color-red-300)] data-active:[--btn-icon:var(--color-red-200)] data-hover:[--btn-icon:var(--color-red-200)]',
    ],
    orange: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-orange-500)] [--btn-border:var(--color-orange-600)]/90',
      '[--btn-icon:var(--color-orange-300)] data-active:[--btn-icon:var(--color-orange-200)] data-hover:[--btn-icon:var(--color-orange-200)]',
    ],
    amber: [
      'text-amber-950 [--btn-hover-overlay:var(--color-white)]/25 [--btn-bg:var(--color-amber-400)] [--btn-border:var(--color-amber-500)]/80',
      '[--btn-icon:var(--color-amber-600)]',
    ],
    yellow: [
      'text-yellow-950 [--btn-hover-overlay:var(--color-white)]/25 [--btn-bg:var(--color-yellow-300)] [--btn-border:var(--color-yellow-400)]/80',
      '[--btn-icon:var(--color-yellow-600)] data-active:[--btn-icon:var(--color-yellow-700)] data-hover:[--btn-icon:var(--color-yellow-700)]',
    ],
    lime: [
      'text-lime-950 [--btn-hover-overlay:var(--color-white)]/25 [--btn-bg:var(--color-lime-300)] [--btn-border:var(--color-lime-400)]/80',
      '[--btn-icon:var(--color-lime-600)] data-active:[--btn-icon:var(--color-lime-700)] data-hover:[--btn-icon:var(--color-lime-700)]',
    ],
    green: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-green-600)] [--btn-border:var(--color-green-700)]/90',
      '[--btn-icon:var(--color-white)]/60 data-active:[--btn-icon:var(--color-white)]/80 data-hover:[--btn-icon:var(--color-white)]/80',
    ],
    emerald: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-emerald-600)] [--btn-border:var(--color-emerald-700)]/90',
      '[--btn-icon:var(--color-white)]/60 data-active:[--btn-icon:var(--color-white)]/80 data-hover:[--btn-icon:var(--color-white)]/80',
    ],
    teal: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-teal-600)] [--btn-border:var(--color-teal-700)]/90',
      '[--btn-icon:var(--color-white)]/60 data-active:[--btn-icon:var(--color-white)]/80 data-hover:[--btn-icon:var(--color-white)]/80',
    ],
    sky: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-sky-500)] [--btn-border:var(--color-sky-600)]/80',
      '[--btn-icon:var(--color-white)]/60 data-active:[--btn-icon:var(--color-white)]/80 data-hover:[--btn-icon:var(--color-white)]/80',
    ],
    blue: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-blue-600)] [--btn-border:var(--color-blue-700)]/90',
      '[--btn-icon:var(--color-blue-400)] data-active:[--btn-icon:var(--color-blue-300)] data-hover:[--btn-icon:var(--color-blue-300)]',
    ],
    violet: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-violet-500)] [--btn-border:var(--color-violet-600)]/90',
      '[--btn-icon:var(--color-violet-300)] data-active:[--btn-icon:var(--color-violet-200)] data-hover:[--btn-icon:var(--color-violet-200)]',
    ],
    purple: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-purple-500)] [--btn-border:var(--color-purple-600)]/90',
      '[--btn-icon:var(--color-purple-300)] data-active:[--btn-icon:var(--color-purple-200)] data-hover:[--btn-icon:var(--color-purple-200)]',
    ],
    fuchsia: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-fuchsia-500)] [--btn-border:var(--color-fuchsia-600)]/90',
      '[--btn-icon:var(--color-fuchsia-300)] data-active:[--btn-icon:var(--color-fuchsia-200)] data-hover:[--btn-icon:var(--color-fuchsia-200)]',
    ],
    pink: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-pink-500)] [--btn-border:var(--color-pink-600)]/90',
      '[--btn-icon:var(--color-pink-300)] data-active:[--btn-icon:var(--color-pink-200)] data-hover:[--btn-icon:var(--color-pink-200)]',
    ],
    rose: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-rose-500)] [--btn-border:var(--color-rose-600)]/90',
      '[--btn-icon:var(--color-rose-300)] data-active:[--btn-icon:var(--color-rose-200)] data-hover:[--btn-icon:var(--color-rose-200)]',
    ],
  },
} as const

type ColorType = keyof typeof styles.colors

type ButtonProps = (
  | { color?: ColorType; outline?: never; plain?: never; destructive?: never }
  | { color?: never; outline: true; plain?: never; destructive?: never }
  | { color?: never; outline?: never; plain: true; destructive?: never }
  | { color?: never; outline?: true; plain?: never; destructive: true }
) & {
  className?: string
  children: React.ReactNode
} & (
    | (Omit<
        React.ComponentPropsWithoutRef<typeof Headless.Button>,
        'className' | 'children'
      > & {
        href?: undefined
      })
    | (Omit<LinkProps, 'className' | 'children'> & { href: string })
  )

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  { color, outline, plain, destructive, className, children, ...props },
  ref
) {
  const classes = cn(
    className,
    styles.base,
    destructive
      ? cn(outline && styles.colors['destructive-outline'])
      : outline
        ? styles.outline
        : plain
          ? styles.plain
          : cn(
              styles.solid,
              color ? styles.colors[color as ColorType] : styles.colors.primary
            )
  )

  if ('href' in props && props.href !== undefined) {
    return (
      <Link
        {...props}
        className={classes}
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
      >
        <TouchTarget>{children}</TouchTarget>
      </Link>
    )
  }

  return (
    <Headless.Button
      {...props}
      className={cn(classes, 'cursor-pointer')}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
    >
      <TouchTarget>{children}</TouchTarget>
    </Headless.Button>
  )
})

Button.displayName = 'Button'

/**
 * Expand the hit area to at least 44×44px on touch devices
 */
export function TouchTarget({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span
        className="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
        aria-hidden="true"
      />
      {children}
    </>
  )
}
