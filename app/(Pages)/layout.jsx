import Layout from "@/components/layout";

export default function PagesLayout({
    children, // will be a page or nested layout
  }) {
    return (
        <Layout >
   <div className="w-[90%] mx-auto">

        {children}
   </div>
      </Layout>
    )
  }