import {ReactComponent as AnalyticsIcon} from '../icons/analitycs.svg'
import {ReactComponent as TransactionsIcon} from '../icons/transactions.svg'
import {ReactComponent as WalletIcon} from '../icons/wallet.svg'

const icons = {
    analytics: AnalyticsIcon,
    transactions: TransactionsIcon,
    wallet: WalletIcon
}

export const Icon = ({name, ...props}) => {
    const SvgIcon = icons[name]
    if(!SvgIcon) return null
    return <SvgIcon {...props}/>
}