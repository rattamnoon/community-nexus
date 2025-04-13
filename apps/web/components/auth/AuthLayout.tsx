'use client';

import styled from '@emotion/styled';
import { Castoro } from 'next/font/google';
import Image from 'next/image';

const castoro = Castoro({
  weight: '400',
  subsets: ['latin'],
});

const LayoutContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #1d332e;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100svh;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100svh;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const FlexItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 0rem;
  }
`;

const ImageWrapper = styled.div`
  background-color: #2b5f44;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 45svw;
  height: 100svh;
  border-top-left-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;

  @media (max-width: 768px) {
    width: 100%;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;

    height: 45svh;
  }
`;

const NotebookImage = styled.div`
  position: relative;
  width: 350px;
  height: 350px;

  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }
`;

const Caption = styled.p`
  color: white;
  font-style: italic;
  margin-top: 1rem;
  font-size: 1.25rem;
`;

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutContainer>
      <ContentWrapper>
        <FlexWrapper>
          <FlexItem>{children}</FlexItem>
          <ImageWrapper>
            <NotebookImage>
              <Image
                src="/images/notebook.png"
                alt="notebook"
                fill
                style={{ objectFit: 'contain' }}
              />
            </NotebookImage>
            <Caption className={castoro.className}>a Board</Caption>
          </ImageWrapper>
        </FlexWrapper>
      </ContentWrapper>
    </LayoutContainer>
  );
};
