import { useDispatch } from "react-redux";
import { uploadExcelRequest } from "@/store/excel/actions";

interface Props {
  children: React.ReactNode;
}

export default function ExcelUploader({ children }: Props) {
  const dispatch = useDispatch();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    dispatch(uploadExcelRequest(file));
  };

  return (
    <label className="cursor-pointer">
      {children}

      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        hidden
        onChange={handleUpload}
      />
    </label>
  );
}
