import { useState, useCallback } from "react";
import { Upload, FileCheck, AlertCircle } from "lucide-react";
import { Card } from "./ui/card";
import { motion } from "motion/react";

interface UploadCardProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

export function UploadCard({ onFileUpload, isLoading }: UploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      setError(null);

      const files = Array.from(e.dataTransfer.files);
      const gpxFile = files.find((file) =>
        file.name.toLowerCase().endsWith(".gpx"),
      );

      if (gpxFile) {
        setFileName(gpxFile.name);
        onFileUpload(gpxFile);
      } else {
        setFileName(null);
        setError("Please upload a .gpx file");
      }
    },
    [onFileUpload],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.name.toLowerCase().endsWith(".gpx")) {
        setFileName(file.name);
        onFileUpload(file);
      }
    },
    [onFileUpload],
  );

  return (
    <Card className="p-6 bg-forest">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 md:p-12 transition-all cursor-pointer ${
            isDragging
              ? "border-accent bg-accent/5 scale-[1.02]"
              : "border-muted/40 hover:border-muted/80 hover:bg-muted/20"
          } ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept=".gpx"
            className="hidden"
            onChange={handleFileInput}
            disabled={isLoading}
          />

          <div className="flex flex-col items-center justify-center gap-4">
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Upload className="w-12 h-12 text-primary" />
              </motion.div>
            ) : fileName ? (
              <FileCheck className="w-12 h-12 text-accent" />
            ) : (
              <Upload className="w-12 h-12 text-muted/40" />
            )}

            <div className="text-center">
              {fileName ? (
                <div>
                  <p className="text-lg text-primary mb-1">File loaded:</p>
                  <p className="text-sm text-muted-foreground">{fileName}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Click or drag to upload a different file
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-lg text-offwhite mb-2">
                    {isLoading
                      ? "Processing GPX file..."
                      : "Drop your GPX file here"}
                  </p>
                  <p className="text-sm text-muted/40">or click to browse</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-red-300 mt-3 text-center"
          >
            {error}
          </motion.p>
        )}

        <div className="mt-6 text-center text-xs text-offwhite/80">
          <p>Please upload GPX files with waypoint data</p>
        </div>
      </motion.div>
    </Card>
  );
}
