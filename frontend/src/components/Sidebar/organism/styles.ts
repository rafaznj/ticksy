import styled from "styled-components";

interface SidebarProps {
  $isOpen: boolean;
}

export const SidebarContainer = styled.aside<SidebarProps>`
  display: flex;
  z-index: 20;
  height: 100vh;
  min-width: ${({ $isOpen }) => ($isOpen ? "240px" : "80px")};
  width: ${({ $isOpen }) => ($isOpen ? "240px" : "80px")};
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(0)")};
  transition:
    width 0.3s ease-in-out,
    min-width 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacers.xl};
  position: relative;

  @media (max-width: 768px) {
    width: 80px;
    min-width: 80px;
    transform: translateX(0);
  }
`;

export const SidebarContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacers.xl};
`;

export const LogoImage = styled.img`
  width: 3rem;
  height: 3rem;
`;

export const Divider = styled.hr`
  display: block;
  border: 0;
  height: 1px;
  background: ${(props) => props.theme.colors.gray[500]};
  margin-top: ${(props) => props.theme.spacers.xl};
  margin-bottom: ${(props) => props.theme.spacers.xl};
  opacity: 0;
  color: ${(props) => props.theme.colors.gray[500]};
`;
