import {
  Button,
  Checkbox,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  VStack
} from "@chakra-ui/react";
import { MdFilterList } from "@react-icons/all-files/md/MdFilterList";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import SelectType from "types/SelectType";
import { queryToArr } from "utils/queryStringUtils";

type Props = {
  queryKey: string;
  queryGroup?: string;
  filterCb?: (qkey: string, chosenOptions: SelectType["id"][]) => void;

  options: SelectType[];
};

const QueryMultiSelectBtn: FC<Props> = ({
  filterCb = () => null,
  queryKey,
  queryGroup = "t",
  options
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [checkedItems, setCheckedItems] = useState<SelectType["id"][]>(options.map(x => x.id));

  const allChecked = useMemo(() => checkedItems.length === options.length, [checkedItems]);
  const isIndeterminate = useMemo(
    () => checkedItems.length > 0 && checkedItems.length !== options.length,
    [checkedItems]
  );

  const router = useRouter();

  useEffect(() => {
    const filters = queryToArr(router.query.thfilter ?? []);

    filters.forEach(filter => {
      const [checkQueryGroup, checkKey, ...values] = filter.split("_");

      if (queryGroup === checkQueryGroup) {
        if (queryKey === checkKey) {
          setCheckedItems(values);
          filterCb(queryKey, values);
        }
      }
    });
  }, [router, router.query]);

  const onClick = useCallback(() => {
    const copy = { ...router.query };
    const filters = queryToArr(copy.thfilter ?? []).filter(filter => {
      const [checkQueryGroup, checkKey] = filter.split("_");
      return !(queryGroup === checkQueryGroup && queryKey === checkKey);
    });
    if (allChecked) {
      filterCb(queryKey, checkedItems);
    } else {
      filters.push(`${queryGroup}_${queryKey}_${checkedItems.join("_")}`);
    }
    copy["thfilter"] = filters;
    router.replace(
      {
        query: copy
      },
      undefined,
      { shallow: true }
    );
    setIsOpen(false);
  }, [checkedItems, allChecked, router.query]);

  return (
    <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <PopoverTrigger>
        <IconButton
          size="xs"
          aria-label="Filter column"
          colorScheme={isIndeterminate ? "orange" : "gray"}
          onClick={() => setIsOpen(true)}
          icon={<MdFilterList />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Filter</PopoverHeader>
        <PopoverBody>
          <VStack align="left" minH={30} maxH={60} overflowY="auto">
            <Checkbox
              isChecked={allChecked}
              isIndeterminate={isIndeterminate}
              onChange={() => setCheckedItems(allChecked ? [] : options.map(x => x.id))}>
              Select All
            </Checkbox>
            {options.map(o => (
              <Checkbox
                key={o.id}
                value={o.id}
                isChecked={checkedItems.includes(o.id)}
                onChange={() =>
                  setCheckedItems(
                    checkedItems.includes(o.id)
                      ? checkedItems.filter(x => x !== o.id)
                      : [...checkedItems, o.id]
                  )
                }>
                {o.name}
              </Checkbox>
            ))}
          </VStack>
        </PopoverBody>
        <PopoverFooter>
          <Button onClick={onClick}>Apply</Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default QueryMultiSelectBtn;
