import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { BrainCircuit, CircleUserRound } from 'lucide-react'

const Header = () => {
  return (
    <div className='bg-white sticky z-50 top-0 inset-x-0 h-16'>
      <header className='relative bg-white'>
        <MaxWidthWrapper>
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center justify-between'>
              <div className='ml-4 flex lg:ml-0'>
                <Link href='/'>
                  <BrainCircuit />
                </Link>
              </div>
              <CircleUserRound />
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Header