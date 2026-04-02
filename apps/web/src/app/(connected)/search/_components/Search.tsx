import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const Search = () => (

    <Field orientation="horizontal">
        <Input type="search" placeholder="Search..." />
        <Button>Search</Button>
    </Field>
)