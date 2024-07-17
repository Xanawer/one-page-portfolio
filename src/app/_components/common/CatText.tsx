import { Dialog, DialogContent, DialogTrigger } from "../common/BrutalDialog";

export default function CatChat() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="absolute bottom-0 left-0">
          <pre className="text-xs transition-all duration-100 hover:-translate-y-1 hover:cursor-pointer hover:text-gray-400">
            {`
⠀ ／l、   
（ﾟ､ ｡ ７
⠀l、ﾞ ~ヽ 
   じしf_, )ノ 
               `}
          </pre>
        </div>
      </DialogTrigger>
      <DialogContent>Testing out the dialog content.</DialogContent>
    </Dialog>
  );
}
