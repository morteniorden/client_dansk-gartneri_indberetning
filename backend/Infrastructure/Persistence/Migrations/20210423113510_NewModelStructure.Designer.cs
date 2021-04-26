﻿// <auto-generated />
using System;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure.Persistence.Migrations
{
  [DbContext(typeof(ApplicationDbContext))]
  [Migration("20210423113510_NewModelStructure")]
  partial class NewModelStructure
  {
    protected override void BuildTargetModel(ModelBuilder modelBuilder)
    {
#pragma warning disable 612, 618
      modelBuilder
          .HasAnnotation("Relational:MaxIdentifierLength", 128)
          .HasAnnotation("ProductVersion", "5.0.5")
          .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

      modelBuilder.Entity("Domain.Entities.Address", b =>
          {
            b.Property<int>("Id")
                      .ValueGeneratedOnAdd()
                      .HasColumnType("int")
                      .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            b.Property<string>("AddressLine1")
                      .HasColumnType("nvarchar(max)");

            b.Property<string>("AddressLine2")
                      .HasColumnType("nvarchar(max)");

            b.Property<string>("AddressLine3")
                      .HasColumnType("nvarchar(max)");

            b.Property<string>("AddressLine4")
                      .HasColumnType("nvarchar(max)");

            b.Property<int>("ClientId")
                      .HasColumnType("int");

            b.HasKey("Id");

            b.ToTable("Addresses");
          });

      modelBuilder.Entity("Domain.Entities.Email", b =>
          {
            b.Property<int>("Id")
                      .ValueGeneratedOnAdd()
                      .HasColumnType("int")
                      .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            b.Property<DateTimeOffset>("Created")
                      .HasColumnType("datetimeoffset");

            b.Property<string>("CreatedBy")
                      .HasColumnType("nvarchar(max)");

            b.Property<string>("CtaButtonText")
                      .HasMaxLength(200)
                      .HasColumnType("nvarchar(200)");

            b.Property<string>("Heading1")
                      .HasColumnType("nvarchar(max)");

            b.Property<string>("Heading2")
                      .HasColumnType("nvarchar(max)");

            b.Property<string>("Heading3")
                      .HasColumnType("nvarchar(max)");

            b.Property<DateTimeOffset?>("LastModified")
                      .HasColumnType("datetimeoffset");

            b.Property<string>("LastModifiedBy")
                      .HasColumnType("nvarchar(max)");

            b.Property<string>("Name")
                      .HasMaxLength(200)
                      .HasColumnType("nvarchar(200)");

            b.Property<string>("Paragraph1")
                      .HasColumnType("nvarchar(max)");

            b.Property<string>("Paragraph2")
                      .HasColumnType("nvarchar(max)");

            b.Property<string>("Paragraph3")
                      .HasColumnType("nvarchar(max)");

            b.Property<string>("Subject")
                      .HasMaxLength(200)
                      .HasColumnType("nvarchar(200)");

            b.HasKey("Id");

            b.ToTable("Emails");
          });

      modelBuilder.Entity("Domain.Entities.Statement", b =>
          {
            b.Property<int>("Id")
                      .ValueGeneratedOnAdd()
                      .HasColumnType("int")
                      .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            b.Property<int?>("AccountantId")
                      .HasColumnType("int");

            b.Property<int>("AccountantType")
                      .HasColumnType("int");

            b.Property<int>("AccountingYear")
                      .HasColumnType("int");

            b.Property<int>("ClientId")
                      .HasColumnType("int");

            b.Property<DateTimeOffset>("Created")
                      .HasColumnType("datetimeoffset");

            b.Property<string>("CreatedBy")
                      .HasColumnType("nvarchar(max)");

            b.Property<DateTimeOffset?>("LastModified")
                      .HasColumnType("datetimeoffset");

            b.Property<string>("LastModifiedBy")
                      .HasColumnType("nvarchar(max)");

            b.Property<int>("Status")
                      .HasColumnType("int");

            b.Property<int>("s1_boughtPlants")
                      .HasColumnType("int");

            b.Property<int>("s1_mushrooms")
                      .HasColumnType("int");

            b.Property<int>("s1_tomatoCucumberHerb")
                      .HasColumnType("int");

            b.Property<int>("s3_boughtPlants")
                      .HasColumnType("int");

            b.Property<int>("s3_carrots")
                      .HasColumnType("int");

            b.Property<int>("s3_onions")
                      .HasColumnType("int");

            b.Property<int>("s3_other")
                      .HasColumnType("int");

            b.Property<int>("s3_peas")
                      .HasColumnType("int");

            b.Property<int>("s4_boughtPlants")
                      .HasColumnType("int");

            b.Property<int>("s4_cutFlowers")
                      .HasColumnType("int");

            b.Property<int>("s4_onions")
                      .HasColumnType("int");

            b.Property<int>("s4_plants")
                      .HasColumnType("int");

            b.Property<int>("s7_boughtPlants")
                      .HasColumnType("int");

            b.Property<int>("s7_plants")
                      .HasColumnType("int");

            b.Property<int>("s8_applesPearsEtc")
                      .HasColumnType("int");

            b.Property<int>("s8_cherries")
                      .HasColumnType("int");

            b.Property<int>("s8_currant")
                      .HasColumnType("int");

            b.Property<int>("s8_otherBerryFruit")
                      .HasColumnType("int");

            b.Property<int>("s8_otherStoneFruit")
                      .HasColumnType("int");

            b.Property<int>("s8_packaging")
                      .HasColumnType("int");

            b.Property<int>("s8_plums")
                      .HasColumnType("int");

            b.Property<int>("s8_strawberries")
                      .HasColumnType("int");

            b.HasKey("Id");

            b.HasIndex("AccountantId");

            b.HasIndex("ClientId", "AccountingYear")
                      .IsUnique();

            b.ToTable("Statements");
          });

      modelBuilder.Entity("Domain.Entities.User", b =>
          {
            b.Property<int>("Id")
                      .ValueGeneratedOnAdd()
                      .HasColumnType("int")
                      .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            b.Property<DateTimeOffset>("Created")
                      .HasColumnType("datetimeoffset");

            b.Property<string>("CreatedBy")
                      .HasColumnType("nvarchar(max)");

            b.Property<DateTimeOffset?>("DeactivationTime")
                      .HasColumnType("datetimeoffset");

            b.Property<string>("Email")
                      .IsRequired()
                      .HasColumnType("nvarchar(450)");

            b.Property<DateTimeOffset?>("LastModified")
                      .HasColumnType("datetimeoffset");

            b.Property<string>("LastModifiedBy")
                      .HasColumnType("nvarchar(max)");

            b.Property<string>("Name")
                      .IsRequired()
                      .HasMaxLength(200)
                      .HasColumnType("nvarchar(200)");

            b.Property<string>("Password")
                      .HasColumnType("nvarchar(max)");

            b.Property<int>("Role")
                      .HasColumnType("int");

            b.Property<string>("SSOTokenId")
                      .HasColumnType("nvarchar(max)");

            b.HasKey("Id");

            b.HasIndex("Email")
                      .IsUnique();

            b.ToTable("Users");

            b.HasDiscriminator<int>("Role");
          });

      modelBuilder.Entity("Domain.Entities.Accountant", b =>
          {
            b.HasBaseType("Domain.Entities.User");

            b.Property<int>("AccountantType")
                      .HasColumnType("int");

            b.HasDiscriminator().HasValue(1);
          });

      modelBuilder.Entity("Domain.Entities.Admin", b =>
          {
            b.HasBaseType("Domain.Entities.User");

            b.HasDiscriminator().HasValue(0);
          });

      modelBuilder.Entity("Domain.Entities.Client", b =>
          {
            b.HasBaseType("Domain.Entities.User");

            b.Property<int?>("AddressId")
                      .IsRequired()
                      .HasColumnType("int");

            b.Property<string>("CVRNumber")
                      .HasColumnType("nvarchar(max)");

            b.Property<string>("Tel")
                      .HasColumnType("nvarchar(max)");

            b.HasIndex("AddressId")
                      .IsUnique()
                      .HasFilter("[AddressId] IS NOT NULL");

            b.HasDiscriminator().HasValue(2);
          });

      modelBuilder.Entity("Domain.Entities.Statement", b =>
          {
            b.HasOne("Domain.Entities.Accountant", "Accountant")
                      .WithMany("Statements")
                      .HasForeignKey("AccountantId");

            b.HasOne("Domain.Entities.Client", "Client")
                      .WithMany("Statements")
                      .HasForeignKey("ClientId")
                      .OnDelete(DeleteBehavior.Cascade)
                      .IsRequired();

            b.Navigation("Accountant");

            b.Navigation("Client");
          });

      modelBuilder.Entity("Domain.Entities.Client", b =>
          {
            b.HasOne("Domain.Entities.Address", "Address")
                      .WithOne("Client")
                      .HasForeignKey("Domain.Entities.Client", "AddressId")
                      .OnDelete(DeleteBehavior.Cascade)
                      .IsRequired();

            b.Navigation("Address");
          });

      modelBuilder.Entity("Domain.Entities.Address", b =>
          {
            b.Navigation("Client");
          });

      modelBuilder.Entity("Domain.Entities.Accountant", b =>
          {
            b.Navigation("Statements");
          });

      modelBuilder.Entity("Domain.Entities.Client", b =>
          {
            b.Navigation("Statements");
          });
#pragma warning restore 612, 618
    }
  }
}
