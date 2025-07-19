// Fix TypeScript errors for CSS imports
declare module "*.css" {
  const styles: any;
  export default styles;
}
