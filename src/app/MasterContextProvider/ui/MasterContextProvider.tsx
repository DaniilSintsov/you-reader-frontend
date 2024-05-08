import { AlertProvider } from '@/src/shared/lib/hooks/useAlert';
import { MobileMenuProvider } from '@/src/shared/lib/hooks/useMobileMenu';
import { ProfileProvider } from '@/src/shared/lib/hooks/useStoreProfile';

export default function MasterContextProvider({ children }: { children: React.ReactNode }) {
	return (
		<MobileMenuProvider>
			<AlertProvider>
				<ProfileProvider>{children}</ProfileProvider>
			</AlertProvider>
		</MobileMenuProvider>
	);
}
