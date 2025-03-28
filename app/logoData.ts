export type LogoData = {
     id: string;
     name: string;
     src: string;
     width: number;
     height: number;
     left?: number;
     top?: number;
     visible?: boolean;
   };
   
   export const logos: LogoData[] = [
     {
       id: "culture",
       name: "Culture Authority",
       src: "/assets/org-logos/culture-logo.png",
       width: 80,
       height: 80,
       left: 10,
       top: 10,
       visible: true,
     },
     {
       id: "sfda",
       name: "SFDA",
       src: "/assets/org-logos/sfda-logo.png",
       width: 100,
       height: 100,
       left: 20,
       top: 10,
       visible: false,
     },
     {
       id: "socpa",
       name: "SOCPA",
       src: "/assets/org-logos/socpa-logo.png",
       width: 90,
       height: 90,
       left: 15,
       top: 15,
       visible: true,
     },
     {
       id: "statistics",
       name: "Statistics Authority",
       src: "/assets/org-logos/statistics-logo.png",
       width: 85,
       height: 85,
       left: 25,
       top: 10,
       visible: false,
     },
   ];
   