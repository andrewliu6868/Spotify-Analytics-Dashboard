export default function DashboardLayout({children}: { children: React.ReactNode }){
    // all children of dashboard will share this layout
    return(
        <div className="flex flex-col gap-y-4">
            {children}
        </div>
    );
}