import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  EventHandler,
  MouseEvent,
  PropsWithChildren,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { classNames, hasOwn } from '@trms/utils'

import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect'
import { useActionKey } from '../hooks/useActionKey'

const SearchContext = createContext<{
  onOpen?: EventHandler<MouseEvent>
  onInput?: EventHandler<MouseEvent>
}>(null)

export const SearchButton = ({ children, ...props }) => {
  let searchButtonRef = useRef()
  let actionKey = useActionKey()
  let { onOpen, onInput } = useContext(SearchContext)

  useEffect(() => {
    function onKeyDown(event) {
      if (searchButtonRef && searchButtonRef.current === document.activeElement && onInput) {
        if (/[a-zA-Z0-9]/.test(String.fromCharCode(event.keyCode))) {
          onInput(event)
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onInput, searchButtonRef])

  return (
    <button type="button" ref={searchButtonRef} onClick={onOpen} {...props}>
      {typeof children === 'function' ? children({ actionKey }) : children}
    </button>
  )
}
SearchButton.displayName = 'SearchButton'

export const SidebarContext = createContext<{
  nav?: any
  navIsOpen?: boolean
  setNavIsOpen?: () => boolean
} | null>(null)

const NavItem = forwardRef<
  HTMLLIElement,
  PropsWithChildren<{
    href?: string
    isActive?: boolean
    isPublished?: boolean
    fallbackHref?: string
  }>
>(({ href, children, isActive, isPublished, fallbackHref }, ref) => {
  return (
    <li ref={ref} data-active={isActive ? 'true' : undefined}>
      <Link
        href={isPublished ? href : fallbackHref}
        className={classNames('block border-l pl-4 -ml-px', {
          'text-sky-500 border-current font-semibold dark:text-sky-400': isActive,
          'border-transparent hover:border-slate-400 dark:hover:border-slate-500': !isActive,
          'text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300':
            !isActive && isPublished,
          'text-slate-400': !isActive && !isPublished,
        })}
      >
        {children}
      </Link>
    </li>
  )
})
NavItem.displayName = "NavItem";

/**
 * Find the nearst scrollable ancestor (or self if scrollable)
 *
 * Code adapted and simplified from the smoothscroll polyfill
 */
function nearestScrollableContainer<El extends HTMLElement | ShadowRoot>(elem: El) {
  let _el: HTMLElement

  /**
   * indicates if an element can be scrolled
   */
  function isScrollable(el: El) {
    // A lot of TypeScript acrobatics here to get around type definition disparities
    // between ParentNode, ShadowRoot, Element, HTMLElement, and Node type definitions.
    if (!hasOwn(el, 'clientHeight')) return false

    const htmlEl = el as HTMLElement
    const style = window.getComputedStyle(htmlEl)
    const overflowX = style['overflowX']
    const overflowY = style['overflowY']
    const canScrollY = htmlEl.clientHeight < htmlEl.scrollHeight
    const canScrollX = htmlEl.clientWidth < htmlEl.scrollWidth

    const isScrollableY = canScrollY && (overflowY === 'auto' || overflowY === 'scroll')
    const isScrollableX = canScrollX && (overflowX === 'auto' || overflowX === 'scroll')

    return isScrollableY || isScrollableX
  }

  while (elem !== document.body && isScrollable(elem) === false) {
    _el = (elem.parentNode || (elem as ShadowRoot).host) as HTMLElement
  }

  return _el
}

const Nav = ({ nav, children, fallbackHref, mobile = false }) => {
  const router = useRouter()
  const activeItemRef = useRef<HTMLLIElement>()
  const previousActiveItemRef = useRef<HTMLLIElement>()
  const scrollRef = useRef()

  useIsomorphicLayoutEffect(() => {
    function updatePreviousRef() {
      previousActiveItemRef.current = activeItemRef.current
    }

    if (activeItemRef.current) {
      if (activeItemRef.current === previousActiveItemRef.current) {
        updatePreviousRef()
        return
      }

      updatePreviousRef()

      const scrollable = nearestScrollableContainer(scrollRef.current)

      const scrollRect = scrollable.getBoundingClientRect()
      const activeItemRect = activeItemRef.current.getBoundingClientRect()

      const top = activeItemRef.current.offsetTop
      const bottom = top - scrollRect.height + activeItemRect.height

      if (scrollable.scrollTop > top || scrollable.scrollTop < bottom) {
        scrollable.scrollTop = top - scrollRect.height / 2 + activeItemRect.height / 2
      }
    }
  }, [router.pathname])

  return (
    <nav ref={scrollRef} id="nav" className="lg:text-sm lg:leading-6 relative">
      <div className="sticky top-0 -ml-0.5 pointer-events-none">
        {!mobile && <div className="h-10 bg-white dark:bg-slate-900" />}
        <div className="bg-white dark:bg-slate-900 relative pointer-events-auto">
          <SearchButton className="hidden w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700">
            {({ actionKey }) => (
              <>
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  aria-hidden="true"
                  className="mr-3 flex-none"
                >
                  <path
                    d="m19 19-3.5-3.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="11"
                    cy="11"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Quick search...
                {actionKey && (
                  <span className="ml-auto pl-3 flex-none text-xs font-semibold">
                    {actionKey[0]}K
                  </span>
                )}
              </>
            )}
          </SearchButton>
        </div>
        {!mobile && <div className="h-8 bg-gradient-to-b from-white dark:from-slate-900" />}
      </div>
      <ul>
        <TopLevelNav mobile={mobile} />
        {children}
        {nav &&
          Object.keys(nav)
            .map(category => {
              let publishedItems = nav[category].filter(item => item.published !== false)
              if (publishedItems.length === 0 && !fallbackHref) return null
              return (
                <li key={category} className="mt-12 lg:mt-8">
                  <h5
                    className={classNames('mb-8 lg:mb-3 font-semibold', {
                      'text-slate-900 dark:text-slate-200': publishedItems.length > 0,
                      'text-slate-400': publishedItems.length === 0,
                    })}
                  >
                    {category}
                  </h5>
                  <ul
                    className={classNames(
                      'space-y-6 lg:space-y-2 border-l border-slate-100',
                      mobile ? 'dark:border-slate-700' : 'dark:border-slate-800',
                    )}
                  >
                    {(fallbackHref ? nav[category] : publishedItems).map((item, i) => {
                      let isActive = item.match
                        ? item.match.test(router.pathname)
                        : item.href === router.pathname
                      return (
                        <NavItem
                          key={i}
                          href={item.href}
                          isActive={isActive}
                          ref={isActive ? activeItemRef : undefined}
                          isPublished={item.published !== false}
                          fallbackHref={fallbackHref}
                        >
                          {item.shortTitle || item.title}
                        </NavItem>
                      )
                    })}
                  </ul>
                </li>
              )
            })
            .filter(Boolean)}
      </ul>
    </nav>
  )
}
Nav.displayName = "Nav";

interface TopLevelLinkProps {
  href?: string
  className?: string | undefined
  icon?: any
  isActive?: boolean
  onClick?: EventHandler<any>
  shadow?: any
  activeBackground?: string
  mobile?: boolean
}

const TopLevelLink = ({
  children,
  href,
  className,
  icon,
  isActive,
  onClick,
  shadow,
  activeBackground,
  mobile,
}: PropsWithChildren<TopLevelLinkProps>) => {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={classNames(
          'group flex items-center lg:text-sm lg:leading-6',
          className,
          isActive
            ? 'font-semibold text-sky-500 dark:text-sky-400'
            : 'font-medium text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300',
        )}
      >
        <div
          className={classNames(
            'mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10',
            shadow,
            isActive
              ? [activeBackground, 'dark:highlight-white/10']
              : mobile
              ? 'dark:bg-slate-700 dark:highlight-white/5'
              : 'dark:bg-slate-800 dark:highlight-white/5',
          )}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
            {icon}
          </svg>
        </div>
        {children}
      </Link>
    </li>
  )
}
TopLevelLink.displayName = "TopLevelLink";

const TopLevelNav = ({ mobile }) => {
  let { pathname } = useRouter()

  return (
    <>
      <TopLevelLink
        mobile={mobile}
        href="/docs/installation"
        isActive={pathname.startsWith('/docs')}
        className="mb-4"
        shadow="group-hover:shadow-sky-200 dark:group-hover:bg-sky-500"
        activeBackground="dark:bg-sky-500"
        icon={
          <>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.5 7c1.093 0 2.117.27 3 .743V17a6.345 6.345 0 0 0-3-.743c-1.093 0-2.617.27-3.5.743V7.743C5.883 7.27 7.407 7 8.5 7Z"
              className={classNames(
                'fill-sky-200 group-hover:fill-sky-500',
                pathname.startsWith('/docs')
                  ? 'dark:fill-sky-300 dark:group-hover:fill-sky-300'
                  : 'dark:fill-slate-400 dark:group-hover:fill-sky-300',
              )}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.5 7c1.093 0 2.617.27 3.5.743V17c-.883-.473-2.407-.743-3.5-.743s-2.117.27-3 .743V7.743a6.344 6.344 0 0 1 3-.743Z"
              className={classNames(
                'fill-sky-400 group-hover:fill-sky-500',
                pathname.startsWith('/docs')
                  ? 'dark:fill-sky-200 dark:group-hover:fill-sky-200'
                  : 'dark:fill-slate-600 dark:group-hover:fill-sky-200',
              )}
            />
          </>
        }
      >
        Documentation
      </TopLevelLink>
      <TopLevelLink
        mobile={mobile}
        href="https://tailwindui.com/components?ref=sidebar"
        className="mb-4"
        shadow="group-hover:shadow-indigo-200 dark:group-hover:bg-indigo-500"
        icon={
          <>
            <path
              d="m6 9 6-3 6 3v6l-6 3-6-3V9Z"
              className={classNames(
                'fill-indigo-100 group-hover:fill-indigo-200',
                mobile ? 'dark:fill-slate-300' : 'dark:fill-slate-400',
              )}
            />
            <path
              d="m6 9 6 3v7l-6-3V9Z"
              className={classNames(
                'fill-indigo-300 group-hover:fill-indigo-400 dark:group-hover:fill-indigo-300',
                mobile ? 'dark:fill-slate-400' : 'dark:fill-slate-500',
              )}
            />
            <path
              d="m18 9-6 3v7l6-3V9Z"
              className={classNames(
                'fill-indigo-400 group-hover:fill-indigo-500 dark:group-hover:fill-indigo-400',
                mobile ? 'dark:fill-slate-500' : 'dark:fill-slate-600',
              )}
            />
          </>
        }
      >
        Components
      </TopLevelLink>
      <TopLevelLink
        mobile={mobile}
        href="https://tailwindui.com/templates?ref=sidebar"
        className="mb-4"
        shadow="group-hover:shadow-fuchsia-200 dark:group-hover:bg-fuchsia-600"
        icon={
          <>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 6C6.89543 6 6 6.89543 6 8V16C6 17.1046 6.89543 18 8 18H10.5C11.0523 18 11.5 17.5523 11.5 17V12C11.5 10.6193 12.6193 9.5 14 9.5H18V8C18 6.89543 17.1046 6 16 6H8ZM7.25 8C7.25 7.58579 7.58579 7.25 8 7.25H8.01C8.42421 7.25 8.76 7.58579 8.76 8C8.76 8.41421 8.42421 8.75 8.01 8.75H8C7.58579 8.75 7.25 8.41421 7.25 8ZM10 7.25C9.58579 7.25 9.25 7.58579 9.25 8C9.25 8.41421 9.58579 8.75 10 8.75H10.01C10.4242 8.75 10.76 8.41421 10.76 8C10.76 7.58579 10.4242 7.25 10.01 7.25H10Z"
              fill="#E879F9"
              className={classNames(
                'fill-fuchsia-400 group-hover:fill-fuchsia-500 dark:group-hover:fill-fuchsia-300',
                mobile ? 'dark:fill-slate-300' : 'dark:fill-slate-400',
              )}
            />
            <path
              d="M13 12C13 11.4477 13.4477 11 14 11H17C17.5523 11 18 11.4477 18 12V17C18 17.5523 17.5523 18 17 18H14C13.4477 18 13 17.5523 13 17V12Z"
              fill="#F0ABFC"
              className={classNames(
                'fill-fuchsia-300 group-hover:fill-fuchsia-400',
                mobile ? 'dark:fill-slate-400' : 'dark:fill-slate-500',
              )}
            />
          </>
        }
      >
        Templates
      </TopLevelLink>
      <TopLevelLink
        mobile={mobile}
        href="https://www.youtube.com/tailwindlabs"
        className="mb-4"
        shadow="group-hover:shadow-pink-200 dark:group-hover:bg-pink-500"
        icon={
          <>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              className={classNames(
                'fill-pink-400 group-hover:fill-pink-500 dark:group-hover:fill-pink-300',
                mobile ? 'dark:fill-slate-500' : 'dark:fill-slate-600',
              )}
            />
            <path
              d="M11.082 9.107a.685.685 0 0 0-.72-.01.757.757 0 0 0-.362.653v4.5c0 .27.138.52.362.653.224.133.5.13.72-.01l3.571-2.25A.758.758 0 0 0 15 12a.758.758 0 0 0-.347-.643l-3.571-2.25Z"
              className={classNames(
                'fill-pink-50 group-hover:fill-pink-100 dark:group-hover:fill-white',
                mobile ? 'dark:fill-slate-300' : 'dark:fill-slate-400',
              )}
            />
          </>
        }
      >
        Screencasts
      </TopLevelLink>
      <TopLevelLink
        mobile={mobile}
        href="https://play.tailwindcss.com"
        className="mb-4"
        shadow="group-hover:shadow-blue-200 dark:group-hover:bg-blue-500"
        icon={
          <>
            <path
              d="M4 12a7 7 0 0 1 7-7h2a7 7 0 1 1 0 14h-2a7 7 0 0 1-7-7Z"
              className={classNames(
                'fill-blue-400 group-hover:fill-blue-500 dark:group-hover:fill-blue-400',
                mobile ? 'dark:fill-slate-500' : 'dark:fill-slate-600',
              )}
            />
            <path
              d="M10.25 9.75 7.75 12l2.5 2.25"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={classNames(
                'stroke-blue-50 dark:stroke-slate-400 dark:group-hover:stroke-white',
                mobile ? 'dark:stroke-slate-300' : 'dark:stroke-slate-400',
              )}
            />
            <path
              d="m13.75 9.75 2.5 2.25-2.5 2.25"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={classNames(
                'stroke-blue-200 dark:group-hover:stroke-white',
                mobile ? 'dark:stroke-slate-300' : 'dark:stroke-slate-400',
              )}
            />
          </>
        }
      >
        Playground
      </TopLevelLink>
      <TopLevelLink
        mobile={mobile}
        href="/resources"
        isActive={pathname === '/resources'}
        className="mb-4"
        shadow="group-hover:shadow-purple-200 dark:group-hover:bg-purple-400"
        activeBackground="dark:bg-purple-400"
        icon={
          <>
            <path
              d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
              className={classNames(
                'fill-purple-400 group-hover:fill-purple-500 dark:group-hover:fill-purple-300',
                pathname === '/resources'
                  ? 'dark:fill-purple-300 dark:group-hover:fill-purple-300'
                  : mobile
                  ? 'dark:fill-slate-500'
                  : 'dark:fill-slate-600',
              )}
            />
            <path
              d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
              className={classNames(
                'fill-purple-200 group-hover:fill-purple-300 dark:group-hover:fill-white',
                pathname === '/resources'
                  ? 'dark:fill-white dark:group-hover:fill-white'
                  : mobile
                  ? 'dark:fill-slate-300'
                  : 'dark:fill-slate-400',
              )}
            />
            <path
              d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
              className={classNames(
                'fill-purple-400 group-hover:fill-purple-500 dark:group-hover:fill-purple-300',
                pathname === '/resources'
                  ? 'dark:fill-purple-300 dark:group-hover:fill-purple-300'
                  : mobile
                  ? 'dark:fill-slate-500'
                  : 'dark:fill-slate-600',
              )}
            />
          </>
        }
      >
        <span className={pathname === '/resources' ? 'dark:text-purple-400' : ''}>Resources</span>
      </TopLevelLink>
      <TopLevelLink
        mobile={mobile}
        href="https://github.com/tailwindlabs/tailwindcss/discussions"
        className="mb-4"
        shadow="group-hover:shadow-violet-200 dark:group-hover:bg-violet-500"
        icon={
          <>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 5a6 6 0 0 0-4.687 9.746c.215.27.315.62.231.954l-.514 2.058a1 1 0 0 0 1.485 1.1l2.848-1.71c.174-.104.374-.15.576-.148H13a6 6 0 0 0 0-12h-2Z"
              className={classNames(
                'fill-violet-400 group-hover:fill-violet-500 dark:group-hover:fill-violet-300',
                mobile ? 'dark:fill-slate-500' : 'dark:fill-slate-600',
              )}
            />
            <circle
              cx="12"
              cy="11"
              r="1"
              className={classNames(
                'fill-white dark:group-hover:fill-white',
                mobile ? 'dark:fill-slate-300' : 'dark:fill-slate-400',
              )}
            />
            <circle
              cx="9"
              cy="11"
              r="1"
              className={classNames(
                'fill-violet-200 dark:group-hover:fill-white',
                mobile ? 'dark:fill-slate-300' : 'dark:fill-slate-400',
              )}
            />
            <circle
              cx="15"
              cy="11"
              r="1"
              className={classNames(
                'fill-violet-200 dark:fill-slate-400 dark:group-hover:fill-white',
                mobile ? '' : '',
              )}
            />
          </>
        }
      >
        Community
      </TopLevelLink>
    </>
  )
}
TopLevelNav.displayName = "TopLevelNav";

const Wrapper = ({ allowOverflow, children }) => {
  return <div className={allowOverflow ? undefined : 'overflow-hidden'}>{children}</div>
}
Wrapper.displayName = "Wrapper";

const SidebarLayout = ({
  children,
  navIsOpen,
  setNavIsOpen,
  nav,
  sidebar,
  fallbackHref,
  layoutProps: { allowOverflow = true } = {},
}) => {
  return (
    <SidebarContext.Provider value={{ nav, navIsOpen, setNavIsOpen }}>
      <Wrapper allowOverflow={allowOverflow}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="hidden lg:block fixed z-20 inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto">
            <Nav nav={nav} fallbackHref={fallbackHref}>
              {sidebar}
            </Nav>
          </div>
          <div className="lg:pl-[19.5rem]">{children}</div>
        </div>
      </Wrapper>
    </SidebarContext.Provider>
  )
}

SidebarLayout.displayName = "SidebarLayout";
export { SidebarLayout };
