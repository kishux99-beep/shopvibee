<div className="flex items-center">
  {/* Light Mode ke liye: Dark mode aane par yeh chup jayega */}
  <img 
    src="/logo-light.png" 
    alt="ShopVibee Logo" 
    className="h-8 w-auto block dark:hidden" 
  />

  {/* Dark Mode ke liye: Sirf dark mode activate hone par dikhega */}
  <img 
    src="/logo-dark.png" 
    alt="ShopVibee Logo" 
    className="h-8 w-auto hidden dark:block" 
  />
</div>