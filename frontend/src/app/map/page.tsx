"use client";
import { Footer } from "@/components/footer";
import NavBar from "@/components/navBar";
import SearchBar from "@/components/searchBar";
import { Box, Flex, Stack, Heading, Center, Spinner, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const Map = dynamic(() => import("@/components/map"), { ssr: false });
interface DecodedToken {
  id: number;
  email: string;
  exp: number;
}

export default function MapPage() {
  const [selectedLines, setSelectedLines] = useState<string[]>([]);
  const [lineNumbers, setLineNumbers] = useState<string[]>([]);


  return (
    <>
      <NavBar />
      <div className="flex justify-center">
        <Stack
          p={4}
          spacing={4}
          width="100%"
          maxWidth="1200px"
          alignItems="center"
        >
          <Heading as="h1" textAlign="center">
            Witamy na stronie WawaBus!{" "}
          </Heading>
          <Heading size="md" textAlign="center">
            Sprawdź aktualne położenie autobusów w Warszawie
          </Heading>

          <Flex width="60%" justifyContent="center">
            <SearchBar
              selectedLines={selectedLines}
              setSelectedLines={setSelectedLines}
              lineNumbers={lineNumbers}
            />
          </Flex>
          <Box
            width="100%"
            maxWidth="1000px"
            aspectRatio={1}
            border="1px solid #ccc"
          >
            <Map
              selectedLines={selectedLines}
              lineNumbers={lineNumbers}
              setLineNumbers={setLineNumbers}
            />
          </Box>
        </Stack>
      </div>
      <Footer />
    </>
  );
}
