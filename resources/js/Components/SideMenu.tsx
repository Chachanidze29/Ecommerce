import { useLaravelReactI18n } from "laravel-react-i18n";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import { Category } from "@/types/models";
import { H3 } from "@/Components/Typography/H3";
import { capitalize } from "lodash";
import { Checkbox } from "@/Components/ui/checkbox";

const SideMenu = ({ categories }: { categories: Category[] }) => {
    const { t } = useLaravelReactI18n();

    return (
        <div className="space-y-4">
            <Accordion type="multiple" defaultValue={[]}>
                {categories.map((category) => (
                    <AccordionItem key={category.name} value={category.name}>
                        <AccordionTrigger>
                            <H3 className="m-0">
                                {t(capitalize(category.name))}
                            </H3>
                        </AccordionTrigger>
                        <AccordionContent>
                            {category.sub_categories.map((subCategory) => (
                                <div
                                    key={subCategory.id}
                                    className="flex items-center gap-2 rounded-sm p-2 hover:bg-muted"
                                >
                                    <Checkbox />
                                    <label
                                        className="w-full cursor-pointer"
                                        htmlFor={
                                            subCategory.name + subCategory.id
                                        }
                                    >
                                        {subCategory.name}
                                    </label>
                                </div>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default SideMenu;
