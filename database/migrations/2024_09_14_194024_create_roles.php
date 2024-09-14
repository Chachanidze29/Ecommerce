<?php

use App\Enums\RolesEnum;
use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        Role::create(['name' => RolesEnum::SUPERADMIN])
            ->givePermissionTo(Permission::all());
        Role::create(['name' => RolesEnum::MEMBER]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Role::destroy(['name' => RolesEnum::SUPERADMIN]);
        Role::destroy(['name' => RolesEnum::MEMBER]);
    }
};
