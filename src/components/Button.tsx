const Button = ({
  className = "bg-tangerine-dark text-white px-4 py-2 rounded-full hover:bg-tangerine-light fade-in-out cursor-pointer text-lg font-bold",
  children,
  onClick,
}: {
  className?: string
  children?: React.ReactNode
  onClick?: () => void
}) => {
  return <button className={className} onClick={onClick}>{children}</button>
}

export default Button
