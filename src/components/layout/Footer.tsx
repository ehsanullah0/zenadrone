import Link from "next/link";

const SocialIcon = ({ name }: { name: string }) => (
  <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-semibold hover:bg-primary hover:text-dark transition-colors">
    {name}
  </span>
);

export function Footer() {
  return (
    <footer className="bg-dark border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand & Socials */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="mb-6 block">
              <span className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span className="text-primary">Zena</span>Drone
              </span>
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Autonomous Drones delivering real-time monitoring, safer sites, and faster insights—so your team works smarter, not harder.
            </p>
            <div className="flex items-center gap-3 text-gray-400">
              <Link href="#"><SocialIcon name="FB" /></Link>
              <Link href="#"><SocialIcon name="X" /></Link>
              <Link href="#"><SocialIcon name="IN" /></Link>
              <Link href="#"><SocialIcon name="YT" /></Link>
              <Link href="#"><SocialIcon name="IG" /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Drones</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-primary transition-colors">ZenaDrone 1000</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">IQ Square</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">IQ Nano</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Interceptor P-1</Link></li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-white font-semibold mb-6">Industries</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-primary transition-colors">Agriculture</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Security</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Military</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Oil and Gas</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Events</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">News Room</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} ZenaDrone Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
