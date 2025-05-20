import { SettingsTab } from './components/SettingsTab';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-medium mt-6 mb-3">Settings</h1>
      <SettingsTab />
      {children}
    </div>
  );
};

export default Layout;
