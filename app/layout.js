import Navbar from '@/components/Navbar'
import './globals.css'
import Provider from '@/components/Provider'

export const metadata = {
  title: 'AiPrompt',
  description: 'CRUD operations with search option',
}

// export async function generateMetadata({params, searchParams}) {
//   const product = await getProduct(params.id)

//   return {
//     title: product.title
//   }
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
