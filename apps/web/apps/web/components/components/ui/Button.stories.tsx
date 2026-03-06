import { Button } from './Button';
import { IconButton } from './IconButton';
import { Plus, Trash2, Settings } from 'lucide-react';

export default {
  title: 'UI/Buttons',
};

export const Primary = () => <Button>Primary Button</Button>;
export const Secondary = () => <Button variant="secondary">Secondary Button</Button>;
export const Outline = () => <Button variant="outline">Outline Button</Button>;
export const Destructive = () => <Button variant="destructive">Delete</Button>;
export const Ghost = () => <Button variant="ghost">Ghost Button</Button>;

export const Sizes = () => (
  <div className="flex gap-2 flex-wrap">
    <Button size="xs">Extra Small</Button>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
    <Button size="xl">Extra Large</Button>
  </div>
);

export const States = () => (
  <div className="flex gap-4 flex-col">
    <div className="flex gap-2">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button isLoading>Loading</Button>
    </div>
    <div className="flex gap-2">
      <Button fullWidth>Full Width</Button>
    </div>
  </div>
);

export const WithIcons = () => (
  <div className="flex gap-2 flex-wrap">
    <Button>
      <Plus size={18} />
      Create
    </Button>
    <Button variant="destructive">
      <Trash2 size={18} />
      Delete
    </Button>
    <Button variant="secondary">
      <Settings size={18} />
      Settings
    </Button>
  </div>
);

export const IconButtons = () => (
  <div className="flex gap-2">
    <IconButton variant="primary">
      <Plus size={20} />
    </IconButton>
    <IconButton variant="secondary">
      <Settings size={20} />
    </IconButton>
    <IconButton variant="destructive">
      <Trash2 size={20} />
    </IconButton>
    <IconButton variant="outline">
      <Plus size={20} />
    </IconButton>
  </div>
);