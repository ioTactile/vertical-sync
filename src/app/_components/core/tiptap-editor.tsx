"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TextAlign } from "@tiptap/extension-text-align";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import { Highlight } from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
} from "@tiptap/extension-table";

import * as React from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Image as ImageIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Table as TableIcon,
  Palette,
  FileX,
  HighlighterIcon,
  Check,
} from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Input } from "@/app/_components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

interface TipTapEditorProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  placeholder?: string;
  className?: string;
  editorClassName?: string;
}

const baseExtensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
    link: {
      openOnClick: true,
      HTMLAttributes: {
        rel: "noopener noreferrer",
        class: "text-primary underline",
      },
    },
  }),
  TextStyle,
  Color,
  Image.configure({
    HTMLAttributes: {
      class: "rounded-md max-w-full mx-auto my-4",
      draggable: false,
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Highlight.configure({
    multicolor: true,
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableCell,
  TableHeader,
];

export const TipTapEditor = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  control,
  name,
  placeholder = "Entrez votre contenu ici...",
  className,
  editorClassName,
}: TipTapEditorProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [linkUrl, setLinkUrl] = React.useState<string>("");
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [isSubmittingLink, setIsSubmittingLink] =
    React.useState<boolean>(false);
  const [isSubmittingImage, setIsSubmittingImage] =
    React.useState<boolean>(false);
  const [showLinkPopover, setShowLinkPopover] = React.useState<boolean>(false);
  const [showImagePopover, setShowImagePopover] =
    React.useState<boolean>(false);
  const [showColorPopover, setShowColorPopover] =
    React.useState<boolean>(false);
  const [showHighlightPopover, setShowHighlightPopover] =
    React.useState<boolean>(false);
  const [colorValue, setColorValue] = React.useState<string>("#000000");

  const extensions = React.useMemo(
    () => [
      ...baseExtensions,
      Placeholder.configure({
        placeholder,
      }),
    ],
    [placeholder],
  );

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content: value ?? "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  const createTableHandler = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  const handleColorChange = (color: string) => {
    editor.chain().focus().setColor(color).run();
    setColorValue(color);
  };

  const handleHighlightColor = (color: string) => {
    editor.chain().focus().setHighlight({ color }).run();
  };

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();

      setTimeout(() => {
        editor.commands.focus("end");

        const editorElement = document.querySelector(
          ".tiptap-editor .ProseMirror",
        );
        if (editorElement) {
          editorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);

      setImageUrl("");
      setShowImagePopover(false);
      setIsSubmittingImage(false);
    }
  };

  const addLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
      setLinkUrl("");
      setShowLinkPopover(false);
      setIsSubmittingLink(false);
    }
  };

  return (
    <div className={cn("relative", className)}>
      {editor && (
        <BubbleMenu
          editor={editor}
          options={{
            offset: 6,
            placement: "top",
          }}
          className="bg-background border border-border rounded-md p-1 shadow-md flex items-center gap-1 z-10"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn("h-8 w-8", {
                    "bg-muted": editor.isActive("bold"),
                  })}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                >
                  <Bold className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Gras</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn("h-8 w-8", {
                    "bg-muted": editor.isActive("italic"),
                  })}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                  <Italic className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Italique</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn("h-8 w-8", {
                    "bg-muted": editor.isActive("underline"),
                  })}
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                >
                  <UnderlineIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Souligné</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover
                  open={showLinkPopover}
                  onOpenChange={setShowLinkPopover}
                >
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className={cn("h-8 w-8", {
                        "bg-muted": editor.isActive("link"),
                      })}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowLinkPopover(true);
                      }}
                    >
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-medium">Ajouter un lien</h3>
                      <Input
                        placeholder="https://exemple.com"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            setIsSubmittingLink(true);
                            addLink();
                          }
                        }}
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowLinkPopover(false)}
                        >
                          Annuler
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            setIsSubmittingLink(true);
                            addLink();
                          }}
                          disabled={isSubmittingLink || !linkUrl}
                        >
                          {isSubmittingLink ? "Ajout..." : "Ajouter"}
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent>Lien</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover
                  open={showImagePopover}
                  onOpenChange={setShowImagePopover}
                >
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowImagePopover(true);
                      }}
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-medium">Ajouter une image</h3>
                      <Input
                        placeholder="https://exemple.com/image.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            setIsSubmittingImage(true);
                            addImage();
                          }
                        }}
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowImagePopover(false)}
                        >
                          Annuler
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            setIsSubmittingImage(true);
                            addImage();
                          }}
                          disabled={isSubmittingImage || !imageUrl}
                        >
                          {isSubmittingImage ? "Ajout..." : "Ajouter"}
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent>Image</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover
                  open={showColorPopover}
                  onOpenChange={setShowColorPopover}
                >
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowColorPopover(true);
                      }}
                    >
                      <Palette className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-medium">Couleur du texte</h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "#000000",
                          "#EF4444",
                          "#3B82F6",
                          "#10B981",
                          "#F59E0B",
                          "#8B5CF6",
                        ].map((color) => (
                          <Button
                            key={color}
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 p-0 relative"
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorChange(color)}
                          >
                            {colorValue === color && (
                              <Check className="h-4 w-4 text-white absolute" />
                            )}
                          </Button>
                        ))}
                        <Input
                          type="color"
                          value={colorValue}
                          onChange={(e) => handleColorChange(e.target.value)}
                          className="h-8 w-8 p-1"
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent>Couleur</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover
                  open={showHighlightPopover}
                  onOpenChange={setShowHighlightPopover}
                >
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowHighlightPopover(true);
                      }}
                    >
                      <HighlighterIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-medium">Couleur de surlignage</h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "#FFFF00",
                          "#FF9966",
                          "#CCCCFF",
                          "#99FFCC",
                          "#FFCC99",
                        ].map((color) => (
                          <Button
                            key={color}
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            style={{ backgroundColor: color }}
                            onClick={() => handleHighlightColor(color)}
                          />
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent>Surlignage</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Êtes-vous sûr de vouloir effacer tout le contenu ?",
                      )
                    ) {
                      editor.chain().focus().clearContent().run();
                    }
                  }}
                >
                  <FileX className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Effacer tout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </BubbleMenu>
      )}

      <div className="bg-background border border-border rounded-md mb-2 p-1 flex flex-wrap items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className={cn("h-8 w-8", {
                  "bg-muted": editor.isActive("bold"),
                })}
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Gras</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className={cn("h-8 w-8", {
                  "bg-muted": editor.isActive("italic"),
                })}
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italique</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className={cn("h-8 w-8", {
                  "bg-muted": editor.isActive("underline"),
                })}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              >
                <UnderlineIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Souligné</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="w-px h-6 bg-border mx-1" />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className={cn("h-8 w-8", {
                  "bg-muted": editor.isActive({ textAlign: "left" }),
                })}
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Aligné à gauche</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className={cn("h-8 w-8", {
                  "bg-muted": editor.isActive({ textAlign: "center" }),
                })}
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Centré</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className={cn("h-8 w-8", {
                  "bg-muted": editor.isActive({ textAlign: "right" }),
                })}
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
              >
                <AlignRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Aligné à droite</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className={cn("h-8 w-8", {
                  "bg-muted": editor.isActive({ textAlign: "justify" }),
                })}
                onClick={() =>
                  editor.chain().focus().setTextAlign("justify").run()
                }
              >
                <AlignJustify className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Justifié</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="w-px h-6 bg-border mx-1" />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className={cn("h-8 w-8", {
                  "bg-muted": editor.isActive("heading", { level: 1 }),
                })}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
              >
                <Heading1 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Titre 1</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className={cn("h-8 w-8", {
                  "bg-muted": editor.isActive("heading", { level: 2 }),
                })}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                <Heading2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Titre 2</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className={cn("h-8 w-8", {
                  "bg-muted": editor.isActive("heading", { level: 3 }),
                })}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
              >
                <Heading3 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Titre 3</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="w-px h-6 bg-border mx-1" />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className={cn("h-8 w-8", {
                  "bg-muted": editor.isActive("bulletList"),
                })}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Liste à puces</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className={cn("h-8 w-8", {
                  "bg-muted": editor.isActive("orderedList"),
                })}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Liste ordonnée</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="w-px h-6 bg-border mx-1" />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={createTableHandler}
              >
                <TableIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Insérer tableau</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="w-px h-6 bg-border mx-1" />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={() => {
                  if (
                    window.confirm(
                      "Êtes-vous sûr de vouloir effacer tout le contenu ?",
                    )
                  ) {
                    editor.chain().focus().clearContent().run();
                  }
                }}
              >
                <FileX className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Effacer tout</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <EditorContent
        editor={editor}
        className={cn(
          "min-h-87.5 max-h-150 border rounded-md p-3 focus-visible:outline-hidden overflow-y-auto tiptap-editor",
          {
            "border-destructive": error,
            "focus-visible:ring-1 focus-visible:ring-ring": !error,
          },
          editorClassName,
        )}
      />
      <style jsx>{`
        :global(.tiptap-editor .ProseMirror) {
          min-height: 300px;
          outline: none;
        }
        :global(.tiptap-editor .ProseMirror img) {
          display: block;
          max-width: 100%;
          height: auto;
          margin: 1rem auto;
          cursor: pointer;
        }
        :global(.tiptap-editor .ProseMirror p) {
          margin: 1em 0;
        }
        :global(.tiptap-editor .ProseMirror > * + *) {
          margin-top: 0.75em;
        }
        :global(.tiptap-editor .ProseMirror ul),
        :global(.tiptap-editor .ProseMirror ol) {
          padding: 0 1rem;
        }
        :global(.tiptap-editor .ProseMirror table) {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 0;
          overflow: hidden;
        }
        :global(.tiptap-editor .ProseMirror table td),
        :global(.tiptap-editor .ProseMirror table th) {
          min-width: 1em;
          border: 2px solid #dee2e6;
          padding: 3px 5px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }
        :global(.tiptap-editor .ProseMirror table th) {
          font-weight: bold;
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
  );
};

export default TipTapEditor;
