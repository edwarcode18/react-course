import { NavLink } from "react-router-dom"
import { useShoppingCart } from "../../Hooks/useShoppingCart";
import { GiShoppingCart } from "react-icons/gi";

const Navbar = () => {
    const { cartProducts } = useShoppingCart();

    const menu1 = [
        { to: '/', text: 'Shopi', className: 'font-semibold text-lg' },
        { to: '/', text: 'All', className: '' },
        { to: '/clothes', text: 'Clothes', className: '' },
        { to: '/electronics', text: 'Electronics', className: '' },
        { to: '/furnitures', text: 'Furnitures', className: '' },
        { to: '/toys', text: 'Toys', className: '' },
        { to: '/others', text: 'Others', className: '' }
    ]

    const menu2 = [
        { to: '/email', text: 'edwar@gmail.com', className: 'text-black/60' },
        { to: '/my-orders', text: 'My Orders', className: '' },
        { to: '/my-account', text: 'My Account', className: '' },
        { to: '/sing-in', text: 'Sing In', className: '' },
        {
            to: '/shopping-cart',
            element: (
                <div className="flex items-center gap-1">
                    <GiShoppingCart className='w-6 h-6' />
                    <div>{cartProducts.length}</div>
                </div>
            ),
            className: ''
        },
    ]

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