'use client'

export default function GamePageLayout({
  gamePlaySection,
  gameOptionsSection
}: Readonly<{
  gamePlaySection: React.ReactNode;
  gameOptionsSection: React.ReactNode;
}>) {
  return (
    <div className="flex h-full items-center p-4">
      <main className="h-full w-full flex items-center justify-center mr-8 rounded-md">
        {gamePlaySection}
      </main>

      <div className="hidden w-96 h-full overflow-y-auto bg-[#262521] text-white rounded-md px-4 py-6 sm:px-6 xl:block">
        {gameOptionsSection}
      </div>
    </div>
  );
}

