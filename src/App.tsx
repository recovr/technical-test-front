import { AppShell, Flex, Text, Title } from '@mantine/core'
import { Instructions } from './components'
import { SearchBar } from './components/SearchBar'
import { useCallback, useEffect, useState } from 'react';
import { Spotlight } from './components/Spotlight';
import "./styles/app.css";

export const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("no-scroll")
    } else {
      document.body.classList.remove("no-scroll")
    }
  }, [isModalOpen]);

  const keyDetector = useCallback((event: KeyboardEvent) => {
    if (event.metaKey && event.key === "p" || event.shiftKey && event.key === "/") {
      event.preventDefault();
      setIsModalOpen(true)
    } else if (event.key === "Escape") {
      setIsModalOpen(false)
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", keyDetector, false);

    return () => {
      document.removeEventListener("keydown", keyDetector, false);
    };
  }, [keyDetector]);

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm' }}
    >
      <AppShell.Header bg="dark.5" p="md">
        <Flex
          justify={"space-between"}
        >
          <Title order={3} c="white">Recovr Frontend Technical Test</Title>
          <div>
            <SearchBar setIsModalOpen={setIsModalOpen} />
          </div>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        Navbar
      </AppShell.Navbar>
      <AppShell.Main bg="gray.1">
        <Instructions />
        {isModalOpen && (
          <div className="spotlight">
            <Spotlight setIsModalOpen={setIsModalOpen}></Spotlight>
          </div>
        )}
      </AppShell.Main>
    </AppShell>
  )
}