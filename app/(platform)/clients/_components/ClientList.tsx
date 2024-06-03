'use client';
import { Accordion } from '@/components/ui/accordion';
import NavItem from './NavItem';
import { useLocalStorage } from 'usehooks-ts';
import { Client } from '@/types';

interface ClientListProps {
  clients: Client[];
  storageKey?: string;
}

const ClientList = ({
  clients,
  storageKey = 't-sidebar-state',
}: ClientListProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const defaultAccordionValue = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({ ...curr, [id]: !expanded[id] }));
  };

  if (!clients) {
    return (
      <div className='space-y-2'>
        <NavItem.Skeleton />
        <NavItem.Skeleton />
        <NavItem.Skeleton />
      </div>
    );
  }

  return (
    <Accordion
      type='multiple'
      defaultValue={defaultAccordionValue}
      className='space-y-2'
    >
      {clients.map((client: any) => (
        <NavItem
          key={client.id}
          onExpand={onExpand}
          client={client}
          isExpanded={expanded[client.id]}
        />
      ))}
    </Accordion>
  );
};

export default ClientList;
