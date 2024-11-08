import { NavLink } from "react-router-dom"
import { useShoppingCart } from "../../Hooks/useShoppingCart";

const Navbar = () => {
    const { menu1, menu2 } = useShoppingCart();

    return (
        <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light">
            <ul className='flex items-center gap-3'>
                {menu1.map(link => (
                    <li key={link.text} className={link.className}>
                        <NavLink to={link.to} className={({ isActive }) => isActive ? 'underline underline-offset-4' : undefined}>
                            {link.text}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <ul className='flex items-center gap-3'>
                {menu2.map(link => (
                    <li key={link.text} className={link.className}>
                        <NavLink to={link.to} className={({ isActive }) => isActive ? 'underline underline-offset-4' : undefined}>
                            {link.element || link.text}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar