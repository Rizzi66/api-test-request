export interface FormInputProps {
  onStart: (
    url: string,
    count: number,
    interval: number,
    method: string,
    vagues: number,
    body: string,
    headers: Record<string, string>
  ) => void;
  isRunning: boolean;
}
